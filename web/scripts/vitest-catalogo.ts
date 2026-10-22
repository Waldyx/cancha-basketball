// globalSetup de vitest: regenera api/_catalog.json antes de los tests (ver vitest.config.ts).
export default async function setup() {
  await import("./gen-chat-catalog");
}
