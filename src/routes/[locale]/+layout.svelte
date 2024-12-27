<script lang="ts">
  import "../../i18n";
  import { onMount } from "svelte";
  import { init, waitLocale } from "svelte-i18n";
  import { page } from "$app/stores";
  import TopBar from "$components/TopBar/TopBar.svelte";

  import "$styles/global.scss";

  let localeReady = false;
  const { locale } = $page.params;

  onMount(async () => {
    await init({
      initialLocale: locale,
      fallbackLocale: "en",
    });
    await waitLocale();
    localeReady = true;
  });
</script>

{#if localeReady}
  <TopBar />
  <slot />
{:else}
  <p>Loading...</p>
{/if}
