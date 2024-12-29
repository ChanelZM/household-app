<script lang="ts">
  export let done: boolean = false;
</script>

<div class:done class="card" data-testid="card-container">
  <slot />
</div>

<style lang="scss">
  .card {
    padding: var(--spacing-24);
    background: var(--tc-background-secondary);
    border-radius: var(--radius-lg);
    box-shadow: 0 0 30px rgb(0 0 0 / 10%);
  }

  .done {
    opacity: 0.6;
  }
</style>
