<script lang="ts">
  import VectorGraphic from "$components/VectorGraphic/VectorGraphic.svelte";

  export let id: string;
  export let required = true;
  export let value: string;
  export let testId = "";
  export let ariaLabel: string | undefined = undefined;
</script>

<div class="wrap">
  <select
    {id}
    {required}
    bind:value
    data-testid={testId}
    aria-label={ariaLabel}
  >
    <slot />
  </select>
  <span class="icon">
    <VectorGraphic name="icon-chevron-down" ariaHidden={true} size={0.7} />
  </span>
</div>

<style lang="scss">
  .wrap {
    position: relative;
  }

  select {
    width: 100%;
    padding: 0.8rem;

    appearance: none;
    border-width: 0;
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: 5px solid var(--tc-focus);
    }
  }

  .icon {
    pointer-events: none;

    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);

    display: flex;
  }
</style>
