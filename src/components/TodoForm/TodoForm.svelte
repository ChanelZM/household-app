<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Project } from "$models/project";
  import Button from "$components/Button/Button.svelte";
  import FormLabel from "$components/FormLabel/FormLabel.svelte";
  import FormRow from "$components/FormRow/FormRow.svelte";
  import InputDate from "$components/InputDate/InputDate.svelte";
  import InputText from "$components/InputText/InputText.svelte";
  import Modal from "$components/Modal/Modal.svelte";
  import Select from "$components/Select/Select.svelte";
  import SelectOption from "$components/Select/SelectOption.svelte";
  import Text from "$components/Text/Text.svelte";

  export let projects: Project[] = [];
  export let showModal = false;
  export let description = "";
  export let isLoading = false;
  export let date = "";
  export let projectId = "";
  export let submitLabel;

  const dispatch = createEventDispatcher<{ close: void }>();
</script>

<Modal show={showModal} on:close>
  <Text variant="h1" styling="heading2">Add task</Text>
  <form on:submit|preventDefault class="form">
    <FormRow>
      <FormLabel forId="description" text="Description" />
      <InputText
        id="description"
        name="description"
        value={description}
        testId="todoform-textarea"
      />
    </FormRow>

    <FormRow>
      <FormLabel forId="dueDate" text="Due date" />
      <InputDate
        id="dueDate"
        name="dueDate"
        value={date}
        testId="todoform-input"
      />
    </FormRow>
    <FormRow>
      <FormLabel forId="projects" text="Select project" />
      <Select
        id="projects"
        value={projectId}
        required
        testId="todoform-select-input"
      >
        {#each projects as project}
          <SelectOption value={project.id} text={project.name} />
        {/each}
      </Select>
    </FormRow>

    <div class="buttons">
      <Button
        type="button"
        disabled={isLoading}
        testId="cancelToDo-button"
        variant="tertiary"
        on:click={() => dispatch("close")}>Cancel</Button
      >
      <Button type="submit" testId="todoform-submit-button"
        >{submitLabel}</Button
      >
    </div>
  </form>
</Modal>

<style lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }
</style>
