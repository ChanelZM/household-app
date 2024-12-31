<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const className = "";

  export let type: "button" | "submit" = "button";
  export let disabled: boolean = false;
  export let variant: "primary" | "secondary" | "tertiary" = "primary";
  export let small: boolean = false;
  export let fullwidth: boolean = false;
  export let testId: string;

  const dispatch = createEventDispatcher<{ click: void }>();
</script>

<button
  on:click={() => !disabled && dispatch("click")}
  data-testid={testId}
  class="button {variant} {className}"
  class:is-small={small}
  class:is-fullwidth={fullwidth}
  aria-disabled={disabled}
  {type}
>
  <span class="button-content">
    <slot />
  </span>
</button>

<style lang="scss">
  @use "$styles/base/helpers" as *;
  @use "sass:color";
  @use "sass:list";

  .button {
    cursor: pointer;

    position: relative;

    display: flex;
    gap: var(--spacing-16);
    align-items: center;
    justify-content: center;

    height: 3.5rem;
    padding: 1rem 2rem;

    font-family: var(--font-family-boldena);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    line-height: 1;
    color: var(--tc-background-primary);
    text-transform: lowercase;
    text-wrap: nowrap;

    border-radius: var(--radius-md);

    transition: 120ms linear;

    &::before,
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: var(--radius-md);
    }

    &::before {
      z-index: z-index(button-before);
    }

    &::after {
      z-index: z-index(button-after);
      transform: translate(-5px, -5px);
    }

    &:active {
      &::after {
        transform: translate(0, 0);
      }
    }

    &:focus-visible {
      outline: 5px solid var(--tc-focus);
    }

    &.primary {
      color: var(--tc-button-primary-text);

      &::after {
        background-color: var(--tc-button-primary-background);
      }

      &::before {
        background-color: var(--tc-button-primary-shadow);
      }

      &:hover {
        &::after {
          background-color: var(--tc-button-primary-hover);
        }
      }
    }

    &.secondary {
      color: var(--tc-button-secondary-text);

      &::after {
        background-color: var(--tc-button-secondary-background);
      }

      &::before {
        background-color: var(--tc-button-secondary-shadow);
      }

      &:hover {
        &::after {
          background-color: var(--tc-button-secondary-hover);
        }
      }
    }

    &.tertiary {
      color: var(--tc-button-tertiary-text);

      &::after {
        background-color: var(--tc-button-tertiary-background);
      }

      &::before {
        background-color: var(--tc-button-tertiary-shadow);
      }

      &:hover {
        &::after {
          background-color: var(--tc-button-tertiary-hover);
        }
      }
    }

    &.fullwidth {
      width: 100%;
    }

    &:disabled {
      pointer-events: none;

      &:not(.primary-outline) {
        opacity: 0.8;
      }
    }
  }

  .button-content {
    z-index: z-index(button-text);
    transform: translate(-5px, -5px);

    .button:active & {
      transform: translate(0, 0);
    }
  }
</style>
