#!/usr/bin/env bash
# Lanza a Gemini como TRABAJADOR de CANCHA.ZAPA sobre un fichero de encargo.
#
#   ./gemini-cz.sh trabajo/encargo.md                 # modelo cz-audit (3.5-flash), solo lectura
#   ./gemini-cz.sh trabajo/encargo.md -m cz-barato    # flash-lite: otra cuota diaria, mas barato
#   ./gemini-cz.sh trabajo/encargo.md -o trabajo/w20.md
#   ./gemini-cz.sh trabajo/encargo.md --escribe       # permite que EDITE ficheros (por defecto NO)
#
# Por que este wrapper y no `gemini -p` a pelo:
#  - `< fichero` cierra stdin: sin el, el CLI puede quedarse esperando una tecla.
#  - `--approval-mode plan` impone SOLO LECTURA de verdad (la regla 1 de GEMINI.md era solo texto).
#  - `-m cz-audit` fija el modelo: sin el, el CLI llama antes a un "utility_router" y gasta
#    3 peticiones en vez de 1, con una cuota gratuita de ~20 peticiones AL DIA por modelo.
#  - reintenta si choca con la cuota, en vez de morir con salida vacia.
set -u

ENCARGO="${1:-}"
[ -z "$ENCARGO" ] && { echo "uso: $0 <fichero-encargo> [-m alias] [-o salida] [--escribe]" >&2; exit 2; }
[ -f "$ENCARGO" ] || { echo "no existe el encargo: $ENCARGO" >&2; exit 2; }
shift

MODELO="cz-audit"
SALIDA=""
MODO="plan"
while [ $# -gt 0 ]; do
  case "$1" in
    -m) MODELO="$2"; shift 2 ;;
    -o) SALIDA="$2"; shift 2 ;;
    --escribe) MODO="auto_edit"; shift ;;
    *) echo "opcion desconocida: $1" >&2; exit 2 ;;
  esac
done

TMP="$(mktemp)"
for intento in 1 2 3; do
  gemini -m "$MODELO" --approval-mode "$MODO" -p "" < "$ENCARGO" > "$TMP" 2>"$TMP.err"
  code=$?
  if [ $code -eq 0 ] && [ -s "$TMP" ]; then break; fi
  if grep -qi "quota\|429" "$TMP.err"; then
    echo "[gemini-cz] cuota agotada en $MODELO (intento $intento/3), espero 65 s..." >&2
    sleep 65
  else
    echo "[gemini-cz] fallo (salida $code):" >&2
    grep -v "True color" "$TMP.err" | head -5 >&2
    rm -f "$TMP" "$TMP.err"; exit $code
  fi
done

if [ ! -s "$TMP" ]; then
  echo "[gemini-cz] sin respuesta tras 3 intentos. Si es cuota diaria (20/dia por modelo en el" >&2
  echo "            plan gratuito), prueba '-m cz-barato' o espera a manana." >&2
  rm -f "$TMP" "$TMP.err"; exit 1
fi

if [ -n "$SALIDA" ]; then cp "$TMP" "$SALIDA"; echo "[gemini-cz] escrito en $SALIDA" >&2; else cat "$TMP"; fi
rm -f "$TMP" "$TMP.err"
