import { describe, it, expect } from "vitest";
import { isBotChallengeUrl } from "./aliexpress";

// AliExpress responde a la XHR de precio (mtop...pdp.pc.query) con un reto
// anti-bot en vez de con datos. Capturado en red el 2026-07-30: por cada ficha,
// ~9 llamadas de precio y ~20 respuestas de reto. Detectarlo permite abandonar
// el enlace al instante en vez de agotar esperas que no van a dar nada.
describe("isBotChallengeUrl — señal de reto anti-bot de AliExpress", () => {
  const retos = [
    "https://acs.aliexpress.com//h5/mtop.aliexpress.pdp.pc.query/1.0/_____tmd_____/punish?x5secdata=xg1ad3f13e13f79e7dkae62a5",
    "https://acs.aliexpress.com/h5/mtop.aliexpress.pdp.pc.query/1.0/_____tmd_____/punish?recaptcha=1&iframe=1&x5step=3",
    "https://acs.aliexpress.com/h5/mtop.aliexpress.pdp.pc.query/1.0/_____tmd_____/report?rand=S3WxGHAgAt756Epzn",
  ];
  for (const u of retos) {
    it(`detecta el reto: ${u.slice(40, 90)}`, () => {
      expect(isBotChallengeUrl(u)).toBe(true);
    });
  }

  // Lo importante es NO confundir la petición legítima ni los scripts que la
  // pila anti-bot carga también en páginas sanas: si diéramos por bloqueada una
  // ficha que funciona, perderíamos los pocos precios que hoy sí se cuelan.
  const sanas = [
    "https://acs.aliexpress.com/h5/mtop.aliexpress.pdp.pc.query/1.0/?jsv=2.5.1&appKey=12574478&t=1785453121741",
    "https://es.aliexpress.com/item/1005012511774286.html",
    "https://assets.alicdn.com/g/??/AWSC/AWSC/awsc.js,/sd/baxia-entry/baxiaCommon.js",
    "https://o.alicdn.com/baxia/baxia-entry-gray/index.js",
    "https://es.aliexpress.com/w/wholesale-anta-kt-10.html",
  ];
  for (const u of sanas) {
    it(`NO marca como reto: ${u.slice(8, 60)}`, () => {
      expect(isBotChallengeUrl(u)).toBe(false);
    });
  }
});
