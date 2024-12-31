<script lang="ts">
  import MobileMenuItems from "$components/MobileMenuItems/MobileMenuItems.svelte";
  import VectorGraphic from "$components/VectorGraphic/VectorGraphic.svelte";
  import clickOutside from "$utils/useClickOutside";

  let isOpen: boolean = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
  };
</script>

<div class="mobile-menu">
  <div class="menu-button">
    <button
      on:click|stopPropagation={toggleMenu}
      aria-label="Open menu"
      class="button"><VectorGraphic name="icon-menu" /></button
    >
  </div>
  <div class="container">
    <div class="backdrop" class:is-open={isOpen}>
      <div
        class="panel"
        use:clickOutside={{
          enabled: isOpen,
          callback: toggleMenu,
        }}
      >
        <div class="close-button">
          <button
            on:click|stopPropagation={toggleMenu}
            aria-label="Close menu"
            class="button"
          >
            <VectorGraphic name="icon-close" />
          </button>
        </div>
        <MobileMenuItems>
          <slot name="project-list" slot="project-list" />
        </MobileMenuItems>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @use "$styles/base/helpers" as *;
  @use "$styles/abstracts" as *;

  .button {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 3.5rem;
    height: 3.5rem;
    padding: 1rem;

    color: var(--tc-text-primary);

    background-color: transparent;
    outline: 1px solid transparent;
  }

  .menu-button {
    position: absolute;
    top: var(--spacing-16);
    right: 0;

    @include responsive-min($breakpoint-tablet) {
      display: none;
    }
  }

  .close-button {
    margin: var(--spacing-8);
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;

    display: none;

    width: 100%;
    height: 100%;

    background-color: rgb(0 0 0 / 50%);

    -webkit-overflow-scrolling: touch;

    &.is-open {
      display: block;
    }

    @include responsive-min($breakpoint-tablet) {
      display: none;
      visibility: hidden;
    }
  }

  .panel {
    scrollbar-width: none;

    position: fixed;
    top: 0;
    left: 0;

    overflow-y: auto;

    width: 90%;
    height: 100%;

    background-color: var(--tc-background-primary);

    &::-webkit-scrollbar {
      display: none;
    }

    @include responsive-min($breakpoint-tablet) {
      display: none;
    }
  }

  .container {
    position: relative;
    z-index: z-index(menu);
  }

  .mobile-menu {
    z-index: z-index(menu);
  }
</style>
