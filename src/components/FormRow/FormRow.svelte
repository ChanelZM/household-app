<script lang="ts">
  export let direction: "column" | "row" = "column";
  export let align: "flex-start" | "center" | "normal" = "normal";
</script>

<div
  class="wrap"
  class:row={direction === "row"}
  class:column={direction === "column"}
  class:align-center={align === "center"}
  class:align-flex-start={align === "flex-start"}
>
  <slot />
</div>

<style lang="scss">
  .wrap {
    display: flex;
    gap: 1rem;
  }

  .column {
    flex-direction: column;
  }

  .row {
    flex-direction: row;
  }

  .align-center {
    align-items: center;
  }

  .align-flex-start {
    align-items: flex-start;
  }
</style>
