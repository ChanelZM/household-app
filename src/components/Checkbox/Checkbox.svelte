<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let id: string;
  export let checked: boolean;
  export let disabled: boolean | undefined = undefined;

  const dispatch = createEventDispatcher<{ change: boolean }>();
</script>

<input
  on:change={(e) => dispatch("change", e.currentTarget.checked)}
  {id}
  type="checkbox"
  class="checkbox"
  aria-disabled={disabled}
  {checked}
/>

<style lang="scss">
  .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.25rem;
    height: 1.25rem;
    margin: 0;

    appearance: none;
    background-color: var(--tc-background-primary);
    border: 1px solid var(--tc-text-tertiary);

    &:checked::after {
      content: "";
      width: 0.625rem;
      height: 0.625rem;
      background-color: var(--tc-text-primary);
    }
  }
</style>
