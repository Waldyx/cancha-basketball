"""
Script para encontrar URLs de imágenes válidas en ballershoesdb.com
para las zapatillas con imágenes rotas en canchazapa.com

Uso: python buscar_imagenes_rotas.py
Resultado: imprime las URLs que funcionan y genera un archivo de salida
"""

import requests
import time
import json

# Zapatillas con imagen rota (placeholder SVG)
ZAPAS_ROTAS = [
    "nike-lebron-22",
    "ua-curry-12",
    "nike-sabrina-2",
    "anta-kai-1-speed",
    "nike-kd-18",
    "jordan-luka-3",
    "jordan-tatum-3",
    "nike-kyrie-low-5",
    "jordan-one-take-5",
    "nike-zoom-freak-4",
    "nike-zoom-freak-5",
    "nike-zoom-freak-6",
    "puma-mb03",
    "adidas-ae-1",
    "nb-two-wxy-v4",
    "jordan-luka-2",
    "nike-pg-6",
    "nike-pg-7",
    "nike-don-issue-6",
    "puma-scoot-zeros-3",
    "nike-kyrie-infinity-2",
    "ua-jet-23",
    "nike-air-max-impact-5",
    "li-ning-sonic-12",
    "nike-gt-run-2",
    "nike-gt-jump-2",
    "nike-kyrie-flytrap-6",
    "ua-hovr-havoc-5",
    "nike-air-zoom-crossover-2",
    "li-ning-yu-shuai-18",
    "converse-all-star-pro-bb",
    "nb-kawhi-1",
    "anta-shock-wave-5",
]

BASE = "https://ballershoesdb.com/wp-content/uploads"

def slug_to_variants(slug):
    """Genera variantes de nombre a partir del slug"""
    # Nike LeBron 22 → Nike-LeBron-22
    parts = slug.split("-")
    variants_raw = []

    # Variante 1: Title case de cada parte
    title = "-".join(p.capitalize() for p in parts)
    variants_raw.append(title)

    # Variante 2: Uppercase de marcas conocidas
    brand_map = {
        "ua": "UA", "nb": "New-Balance", "puma": "Puma", "nike": "Nike",
        "adidas": "Adidas", "jordan": "Jordan", "anta": "Anta",
        "converse": "Converse", "li": "Li-Ning", "ning": None,
    }
    fixed_parts = []
    i = 0
    while i < len(parts):
        p = parts[i].lower()
        if p == "li" and i + 1 < len(parts) and parts[i+1].lower() == "ning":
            fixed_parts.append("Li-Ning")
            i += 2
            continue
        if p in brand_map and brand_map[p]:
            fixed_parts.append(brand_map[p])
        else:
            fixed_parts.append(p.capitalize())
        i += 1
    brand_title = "-".join(fixed_parts)
    variants_raw.append(brand_title)

    # Generar sufijos de URL para cada variante de nombre
    urls = []
    for name in set(variants_raw):
        urls.append(f"{BASE}/{name}-Cropped-650x406.jpg")
        urls.append(f"{BASE}/{name}-650x406.jpg")
        urls.append(f"{BASE}/{name}-Cropped.jpg")
        urls.append(f"{BASE}/{name}.jpg")
        # Sin guiones
        name_nohyphen = name.replace("-", "")
        urls.append(f"{BASE}/{name_nohyphen}-Cropped-650x406.jpg")

    return urls

def check_url(url, session):
    try:
        r = session.head(url, timeout=8, allow_redirects=True)
        return r.status_code == 200
    except Exception:
        return False

def main():
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    })

    resultados = {}
    sin_imagen = []

    print(f"\n{'='*60}")
    print(f"Buscando imágenes para {len(ZAPAS_ROTAS)} zapatillas...")
    print(f"{'='*60}\n")

    for slug in ZAPAS_ROTAS:
        urls = slug_to_variants(slug)
        encontrada = None

        for url in urls:
            if check_url(url, session):
                encontrada = url
                break
            time.sleep(0.15)  # No saturar el servidor

        if encontrada:
            print(f"[OK] {slug}")
            print(f"   {encontrada}")
            resultados[slug] = encontrada
        else:
            print(f"[NO] {slug} - no encontrada")
            sin_imagen.append(slug)

        time.sleep(0.3)

    print(f"\n{'='*60}")
    print(f"RESULTADO: {len(resultados)} encontradas / {len(sin_imagen)} sin imagen")
    print(f"{'='*60}\n")

    if sin_imagen:
        print("Sin imagen:")
        for s in sin_imagen:
            print(f"  - {s}")

    # Guardar resultado en JSON
    output = {
        "encontradas": resultados,
        "sin_imagen": sin_imagen
    }
    with open("imagenes_encontradas.json", "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print("\nResultado guardado en: imagenes_encontradas.json")

    # Generar snippet para copiar a zapatillas.ts
    if resultados:
        print("\n--- REEMPLAZOS PARA zapatillas.ts ---")
        for slug, url in resultados.items():
            print(f'// {slug}')
            print(f'imagen: "{url}",')
            print()

if __name__ == "__main__":
    main()
