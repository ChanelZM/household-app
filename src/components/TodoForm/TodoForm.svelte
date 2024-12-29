<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "$components/Button/Button.svelte";
  import FormLabel from "$components/FormLabel/FormLabel.svelte";
  import FormRow from "$components/FormRow/FormRow.svelte";
  import InputText from "$components/InputText/InputText.svelte";
  import Modal from "$components/Modal/Modal.svelte";
  import Select from "$components/Select/Select.svelte";
  import SelectOption from "$components/Select/SelectOption.svelte";
  import Text from "$components/Text/Text.svelte";

  export let showModal = false;
  export let description = "";
  export let frequency: "once" | "daily" | "weekly" | "monthly" = "once";
  export let frequencyValue = "";
  export let isLoading = false;
  export let submitLabel;

  const dispatch = createEventDispatcher<{ close: void }>();
</script>

<Modal show={showModal} on:close>
  <Text variant="h1" styling="heading2">Taak toevoegen</Text>
  <form on:submit|preventDefault class="form">
    <FormRow>
      <FormLabel forId="description" text="Beschrijving" />
      <InputText
        id="description"
        name="description"
        value={description}
        testId="todoform-textarea"
      />
    </FormRow>

    <FormRow>
      <FormLabel forId="frequency" text="Frequentie" />
      <Select
        id="frequency"
        testId="todoform-frequency"
        required
        value={frequency}
      >
        <SelectOption value="once" text="Eenmalig" />
        <SelectOption value="daily" text="Dagelijks" />
        <SelectOption value="weekly" text="Wekelijks" />
        <SelectOption value="monthly" text="Maandelijks" />
      </Select>
      {#if frequency !== "once"}
        <span>Elke</span>
        <InputText
          id="frequencyValue"
          name="frequencyValue"
          value={frequencyValue}
        />
        <span>
          {#if frequency === "daily"}
            dagen
          {:else if frequency === "weekly"}
            weken
          {:else if frequency === "monthly"}
            maanden
          {/if}
        </span>
      {/if}
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
