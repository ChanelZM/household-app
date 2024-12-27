<!-- src/ThemeSwitcher.svelte -->
<script lang="ts">
  type Option = {
    key: string;
    value: string;
  };

  export let legend: string | undefined = undefined;
  export let name: string;
  export let options: Option[];
  export let value: string | undefined = undefined;
  export let disabled: boolean = false;
</script>

<fieldset class="fieldset" aria-disabled={disabled}>
  {#if legend}
    <legend class="legend">{legend}</legend>
  {/if}

  <div class="group">
    {#each options as option}
      <span class="item">
        <input
          bind:group={value}
          class="input"
          type="radio"
          id={option.key}
          value={option.value}
          {name}
        />
        <label class="label" for={option.key}>{option.value}</label>
      </span>
    {/each}
  </div>
</fieldset>

<style lang="scss">
  @use "$styles/abstracts" as *;

  .fieldset {
    margin: 0;
    padding: 0;
    border: 0;
  }

  .legend {
    display: block;

    width: 100%;
    margin-bottom: 0.5em;
    padding: 0;

    font-size: inherit;
    font-weight: bold;
  }

  .group {
    display: inline-block;

    padding: 0.25em;

    background: var(--tc-background-primary);
    border: 1px solid var(--tc-input-border);
    border-radius: var(--radius-pill);
  }

  .item {
    position: relative;
    display: inline-block;
  }

  .input {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    appearance: none;
    opacity: 0;
    background: none;
    border: 2px solid;
  }

  .label {
    display: block;

    padding: 0.25em 0.75em;

    color: var(--tc-text-primary);

    border: 2px solid transparent;
    border-radius: var(--radius-pill);
  }

  .label:hover,
  .input:hover ~ .label {
    color: var(--tc-background-primary);
    background: var(--tc-text-primary);
    border-color: var(--tc-background-primary);
  }

  .fieldset[aria-disabled="true"] .label {
    opacity: 0.5;
  }

  .input:checked + .label {
    margin: 0;
    color: var(--tc-background-primary);
    background-color: var(--tc-text-primary);
    border: 2px solid;
  }

  .fieldset[aria-disabled="true"] .label:hover {
    cursor: not-allowed;
    background: transparent;
    border-color: transparent;
  }

  .fieldset[aria-disabled="true"] .input:checked + .label:hover {
    color: var(--color-white);
    background-color: var(--color-neutral-700);
  }

  .label::after {
    pointer-events: none;
    content: "";

    position: absolute;
    inset: 0;

    border: 2px solid;
    border-color: rgb(0 0 0 / 0%);
    border-radius: var(--radius-pill);

    transition:
      bottom 0.2s ease-in-out,
      border-color 0.2s ease-in-out,
      left 0.2s ease-in-out,
      right 0.2s ease-in-out,
      top 0.2s ease-in-out;
  }

  .input:focus-visible ~ .label::after {
    inset: -0.25em;
    border-color: var(--tc-text-secondary);
  }

  @media screen and (-ms-high-contrast: active) {
    .label {
      margin: 2px;
      border: 0;
    }

    .label:hover,
    .input:hover ~ .label {
      text-decoration: underline;
    }

    .input:checked + .label {
      margin: 0;
      border: 2px solid;
    }

    .fieldset[aria-disabled="true"] .label:hover,
    .fieldset[aria-disabled="true"] .input:hover ~ .label {
      text-decoration: none;
    }
  }
</style>
