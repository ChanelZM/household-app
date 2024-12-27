<script lang="ts">
  import { page } from "$app/stores";
  import MainNavigation from "$components/MainNavigation/MainNavigation.svelte";
  import Text from "$components/Text/Text.svelte";
  import ThemeSwitcher from "$components/ThemeSwitcher/ThemeSwitcher.svelte";

  const { pathname } = $page.url;
</script>

<div class="items">
  <section class="container spacing">
    <div class="heading">
      <Text variant="h3" styling="body-sm">Language</Text>
    </div>
  </section>
  <section class="theme-container container spacing">
    <div class="heading">
      <Text variant="h3" styling="body-sm">Theme</Text>
    </div>

    <ThemeSwitcher />
  </section>

  <section class="container spacing">
    <div class="heading">
      <Text variant="h3" styling="body-sm">Pages</Text>
    </div>

    <MainNavigation />
  </section>

  {#if pathname === `/`}
    <slot name="project-list" />
  {/if}
</div>

<style lang="scss">
  @use "$styles/abstracts" as *;

  .items {
    display: flex;
    flex-direction: column;
  }

  .theme-container {
    margin-top: var(--spacing-24);
    padding: 0 2.5rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);
    padding: 0 1rem;

    @include responsive-min($breakpoint-small-tablet) {
      padding: 0 2.5rem;
    }
  }

  .spacing {
    margin: var(--spacing-24) 0;
  }

  .heading {
    font-weight: 600;
    color: var(--tc-text-secondary);
  }
</style>
