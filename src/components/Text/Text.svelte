<script lang="ts">
  import { onMount } from "svelte";

  export let variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" =
    "p";
  export let styling:
    | "heading1"
    | "heading2"
    | "heading3"
    | "section"
    | "subhead"
    | "subhead-sm"
    | "body"
    | "body-light"
    | "body-sm"
    | "copy"
    | "copy-light" = "body";

  export let center: boolean = false;
  export let className: string = "";
  export let testId = "";

  let Element: keyof HTMLElementTagNameMap = variant;

  onMount(() => {
    Element = variant;
  });
</script>

<svelte:element
  this={Element}
  class="{variant} {styling} {center && 'center'} {className}"
  data-testid={testId}
>
  <slot />
</svelte:element>

<style lang="scss">
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  .span,
  .p {
    margin: 0;
  }

  .heading1 {
    font-family: var(--font-family-boldena);
    font-size: var(--font-size-xxxl);
    font-weight: 300;
    line-height: 1;
    text-transform: lowercase;
  }

  .heading2 {
    font-family: var(--font-family-boldena);
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-light);
    line-height: 1;
    text-transform: lowercase;
  }

  .heading3 {
    font-family: var(--font-family-boldena);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-light);
    line-height: 1;
    text-transform: lowercase;
  }

  .section {
    font-family: var(--font-family-boldena);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    line-height: 1.2;
  }

  .subhead {
    font-family: var(--font-family-boldena);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    line-height: 1.2;
  }

  .subhead-sm {
    font-family: var(--font-family-boldena);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    line-height: 1.2;
  }

  .body {
    font-family: var(--font-family-quicksand);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.6;
  }

  .body-light {
    font-family: var(--font-family-quicksand-light);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-light);
    line-height: 1.6;
  }

  .body-sm {
    font-family: var(--font-family-quicksand-medium);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    line-height: 1.6;
  }

  .copy {
    font-family: var(--font-family-quicksand-medium);
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-semibold);
    line-height: 1.2;
  }

  .copy-light {
    font-family: var(--font-family-quicksand-light);
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-regular);
    line-height: 1.2;
  }

  .center {
    text-align: center;
  }
</style>
