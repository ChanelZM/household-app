<script lang="ts">
</script>

<div class="card" data-testid="card-container">
  <slot />
</div>

<style lang="scss">
  .card {
    padding: var(--spacing-24);
    background: var(--tc-background-primary);
    border: 1px solid var(--tc-decoration);
  }
</style>
