<script lang="ts">
  import TodoForm from "$components/TodoForm/TodoForm.svelte";
  import Button from "../Button/Button.svelte";
  import Text from "../Text/Text.svelte";

  export let isLoading = false;
  export let wasSuccessful = false;

  let showModal: boolean = false;

  $: if (wasSuccessful) {
    closeModal();
  }

  function closeModal() {
    showModal = false;
  }

  function openModal() {
    showModal = true;
  }
</script>

<div class="heading">
  <Text variant="h1" styling="heading1" className="header"
    >Huishouden Saarloos-Mepschen</Text
  >

  <div class="actions">
    <Button on:click={openModal} fullwidth testId="todoheading-add-button">
      Taak toevoegen
    </Button>
  </div>

  <TodoForm
    on:close={closeModal}
    on:submit
    submitLabel="Add"
    {showModal}
    {isLoading}
  />
</div>

<style lang="scss">
  @use "$styles/base/helpers" as *;
  @use "$styles/abstracts" as *;

  .heading :global(.header) {
    color: var(--tc-text-primary);
  }

  .heading :global(.button-icon) {
    color: var(--tc-background-primary);
  }

  .heading {
    display: flex;
    align-items: center;

    width: 100%;
    height: 5rem;
    margin-bottom: var(--spacing-24);
  }

  .actions {
    position: fixed;
    z-index: z-index(button-text);
    right: 0;
    bottom: 0;
    left: 0;

    margin-left: auto;
    padding: var(--spacing-16);

    background-color: var(--tc-background-secondary);

    @include responsive-min($breakpoint-small-tablet) {
      position: static;
      z-index: z-index(block);
      padding: 0;
    }
  }
</style>
