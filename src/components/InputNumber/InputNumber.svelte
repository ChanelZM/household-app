<script lang="ts">
  export let id: string;
  export let name: string;
  export let value: string;
  export let testId = "";
  export let min = "";
  export let max = "";
  export let step = "1";
  export let disabled = false;
</script>

<input
  type="number"
  {id}
  {name}
  {min}
  {max}
  {step}
  bind:value
  data-testid={testId}
  {disabled}
/>

<style lang="scss">
  input {
    padding: 0.8rem;
    border-width: 0;
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: 5px solid var(--tc-focus);
    }

    &:disabled {
      background-color: var(--tc-input-disabled);
    }
  }
</style>
