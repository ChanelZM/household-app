<script lang="ts">
  import MainNavigation from "$components/MainNavigation/MainNavigation.svelte";
  import MobileMenu from "$components/MobileMenu/MobileMenu.svelte";
</script>

<div class="wrapper">
  <MobileMenu>
    <slot name="project-list" slot="project-list" />
  </MobileMenu>

  <a href="/" aria-label="Go to home" class="logo"> Household app </a>

  <div class="items">
    <MainNavigation />
  </div>
</div>

<style lang="scss">
  @use "$styles/abstracts" as *;

  .wrapper {
    display: flex;
    align-items: center;
    height: 6rem;
    padding: 0 var(--spacing-16);
  }

  .logo {
    display: flex;
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
