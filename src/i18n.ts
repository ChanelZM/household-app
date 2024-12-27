import { register } from "svelte-i18n";

register("en", async () => {
  const en = await import("./locales/en.json");
  return en;
});

register("nl", async () => {
  const nl = await import("./locales/nl.json");
  return nl;
});

register("pl", async () => {
  const pl = await import("./locales/pl.json");
  return pl;
});
