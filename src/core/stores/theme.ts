import { writable } from "svelte/store";
import storage from "$utils/localStorage";

export const themes = {
  light: "light",
  dark: "dark",
  custom: "custom",
} as const;

export type Theme = (typeof themes)[keyof typeof themes];

const isClient = typeof window !== "undefined";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return themes.light;

  const savedTheme = storage.get("theme", null);

  if (savedTheme) return savedTheme as Theme;

  const userPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  return userPrefersDark ? themes.dark : themes.light;
};

export const theme = writable<Theme>(getInitialTheme());

theme.subscribe((value) => {
  if (isClient) {
    document.body.className = `${value}-theme`;
    storage.set("theme", value);
  }
});
