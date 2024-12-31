<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import VectorGraphic from "$components/VectorGraphic/VectorGraphic.svelte";

  export let show: boolean;

  let modal: HTMLDivElement;

  const dispatch = createEventDispatcher<{ close: void }>();

  function onClickOutside(e: MouseEvent) {
    if (!modal.contains(e.target as Node)) {
      dispatch("close");
    }
  }
</script>

{#if show}
  <dialog open class="container">
    <div
      class="wrapper"
      role="presentation"
      on:click={(e) => onClickOutside(e)}
    >
      <div class="modal" bind:this={modal}>
        <button
          data-testid="close-button"
          class="close-button"
          type="button"
          on:click={() => dispatch("close")}
          aria-label="Sluit modal"
        >
          <VectorGraphic name="icon-close" />
        </button>

        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </dialog>
{/if}

<style lang="scss">
  @use "$styles/abstracts" as *;
  @use "$styles/base/helpers" as *;

  .container {
    position: fixed;
    z-index: z-index(modal);
    inset: 0;
    color: var(--tc-text-primary);
  }

  .wrapper {
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    background-color: rgba($color-neutral-700, 0.4);
  }

  .modal {
    $spacing-x: 1.5em;
    $spacing-y: 2em;

    position: relative;

    overflow: hidden;
    display: flex;

    width: 100%;
    max-width: 24rem;
    height: fit-content;
    margin: auto;
    padding: var(--spacing-24);

    background-color: var(--tc-modal-background);
    border-radius: var(--radius-lg);
  }

  .modal-body {
    display: block;
    width: 100%;
  }

  .close-button {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;

    width: auto;
    padding: var(--spacing-24) var(--spacing-24) 0 0;

    color: var(--tc-text-primary);

    &::before {
      content: "";

      position: absolute;
      bottom: px(-2);
      left: px(-7);

      width: px(24);
      height: px(24);

      border-radius: 50%;
    }

    &:hover {
      color: rgb(var(--color-neutral-700) 0.6);
    }

    /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
    > :global(*) {
      position: relative;
    }
  }
</style>
