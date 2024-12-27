<script lang="ts">
  import { locale, t } from "svelte-i18n";
  import { page } from "$app/stores";

  let currentLocale = $page.url.pathname.split("/")[1];

  const languages = [
    { code: "en", name: "English" },
    { code: "nl", name: "Dutch" },
    { code: "pl", name: "Polish" },
  ];

  async function switchLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newLocale = selectElement.value;

    const newUrl = `/${newLocale}${$page.url.pathname.slice(currentLocale.length + 1)}`;

    await locale.set(newLocale);

    currentLocale = newLocale;

    window.location.pathname = newUrl;
  }
</script>

<select
  class="language-switcher"
  bind:value={currentLocale}
  on:change={switchLanguage}
  aria-label={$t("selectLanguage")}
>
  {#each languages as lang}
    <option value={lang.code}>{lang.name}</option>
  {/each}
</select>

<style>
  .language-switcher {
    padding: 0.6em 1.2rem;

    text-indent: 1px;
    text-overflow: "";

    appearance: none;
    border-radius: 2rem;
  }
</style>
