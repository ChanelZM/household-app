<script lang="ts">
  export let id: string;
  export let name: string;
  export let value: string;
  export let testId = "";
</script>

<input type="date" {id} {name} bind:value data-testid={testId} />

<style lang="scss">
  input {
    padding: 0.5em 0.8em 0.5em 0;

    font-size: 1rem;

    border-width: 0;
    border-bottom: 2px solid black;
    border-radius: 0;

    &:focus-visible {
      border-color: var(--color-purple-500);
      outline: none;
    }
  }
</style>
