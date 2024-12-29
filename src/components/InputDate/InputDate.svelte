<script lang="ts">
  export let id: string;
  export let name: string;
  export let value: string;
  export let testId = "";
</script>

<input type="date" {id} {name} bind:value data-testid={testId} />

<style lang="scss">
  input {
    padding: 0.8rem;
    border-width: 0;
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: 5px solid var(--tc-focus);
    }
  }
</style>
