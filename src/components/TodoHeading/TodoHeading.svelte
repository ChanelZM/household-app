<script lang="ts">
  import type { Project } from "$models/project";
  import TodoForm from "$components/TodoForm/TodoForm.svelte";
  import Button from "../Button/Button.svelte";
  import Text from "../Text/Text.svelte";

  export let projects: Project[] = [];
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
    <Button on:click={openModal} testId="todoheading-add-button">
      Add todo
    </Button>
  </div>

  <TodoForm
    on:close={closeModal}
    on:submit
    submitLabel="Add"
    {showModal}
    {isLoading}
    {projects}
  />
</div>

<style lang="scss">
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
    margin-left: auto;
  }
</style>
