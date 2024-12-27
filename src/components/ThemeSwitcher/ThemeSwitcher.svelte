<!-- src/ThemeSwitcher.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import RadioPills from "$components/RadioPills/RadioPills.svelte";
  import { type Theme, theme, themes } from "$stores/theme";

  let selectedTheme = $theme;

  function updateThemeFromSelect(newTheme: string) {
    theme.set(newTheme as Theme);
  }

  function updateThemeFromPreference(isDark: boolean) {
    const newTheme = isDark ? themes.dark : themes.light;
    theme.set(newTheme);
  }

  onMount(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) =>
      updateThemeFromPreference(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  });

  $: updateThemeFromSelect(selectedTheme);
</script>

<!-- Temporary theme switcher as options -->
<form action="">
  <RadioPills
    options={Object.values(themes)
      .map((themeItem) => ({
        key: themeItem,
        value: themeItem,
      }))
      .reverse()}
    name="theme"
    bind:value={selectedTheme}
  />
</form>
