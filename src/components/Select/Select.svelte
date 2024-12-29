<script lang="ts">
  export let id: string;
  export let required = true;
  export let value: string;
  export let testId = "";
  export let ariaLabel: string | undefined = undefined;
</script>

<select {id} {required} bind:value data-testid={testId} aria-label={ariaLabel}>
  <slot />
</select>

<style lang="scss">
  select {
    padding: 0.8rem;
    border-width: 0;
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: 5px solid var(--tc-focus);
    }
  }
</style>
