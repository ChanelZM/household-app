<script lang="ts">
  import MainNavigation from "$components/MainNavigation/MainNavigation.svelte";
  import MobileMenu from "$components/MobileMenu/MobileMenu.svelte";
  import ThemeSwitcher from "$components/ThemeSwitcher/ThemeSwitcher.svelte";
  import VectorGraphic from "$components/VectorGraphic/VectorGraphic.svelte";
</script>

<div class="wrapper">
  <MobileMenu>
    <slot name="project-list" slot="project-list" />
  </MobileMenu>

  <a href="/" aria-label="Go to home" class="logo">
    <VectorGraphic name="illustration-logo" size={4} />
  </a>

  <div class="items">
    <MainNavigation />

    <!-- <ThemeSwitcher /> -->
  </div>
</div>

<style lang="scss">
  @use "$styles/abstracts" as *;

  .wrapper {
    display: flex;
    height: 6rem;
    padding: 0 var(--spacing-16);
    border-bottom: 1px solid var(--tc-decoration);
  }

  .logo {
    display: flex;
    height: 6rem;
  }

  .items {
    display: none;

    @include responsive-min($breakpoint-tablet) {
      display: flex;
      gap: var(--spacing-32);
      align-items: center;
      margin-left: auto;
    }
  }
</style>
