import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "**/.claude/**"],
    // api/chat.ts lee api/_catalog.json, que genera el prebuild y cuya copia en git va siempre
    // atrasada: sin esto, los tests del chat fallaban según la última vez que se hubiera construido.
    globalSetup: ["./scripts/vitest-catalogo.ts"],
  },
});
