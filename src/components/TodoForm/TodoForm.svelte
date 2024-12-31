<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "$components/Button/Button.svelte";
  import FormLabel from "$components/FormLabel/FormLabel.svelte";
  import FormRow from "$components/FormRow/FormRow.svelte";
  import InputNumber from "$components/InputNumber/InputNumber.svelte";
  import InputText from "$components/InputText/InputText.svelte";
  import Modal from "$components/Modal/Modal.svelte";
  import Select from "$components/Select/Select.svelte";
  import SelectOption from "$components/Select/SelectOption.svelte";
  import Text from "$components/Text/Text.svelte";

  export let showModal = false;
  export let description = "";
  export let frequency: "once" | "days" | "weeks" | "months" = "once";
  export let frequencyValue = "";
  export let isLoading = false;
  export let submitLabel;

  let currentFrequency = frequency;

  $: max = (() => {
    switch (currentFrequency) {
      case "days":
        return 31;
      case "weeks":
        return 4;
      case "months":
        return 12;
      default:
        return 0;
    }
  })();

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
        bind:value={currentFrequency}
      >
        <SelectOption value="once" text="Eenmalig" />
        <SelectOption value="days" text="Dagelijks" />
        <SelectOption value="weeks" text="Wekelijks" />
        <SelectOption value="months" text="Maandelijks" />
      </Select>
    </FormRow>
    {#if currentFrequency !== "once"}
      <FormRow>
        <span>Elke</span>
        <span>
          <InputNumber
            id="frequencyValue"
            name="frequencyValue"
            value={frequencyValue}
            min="1"
            max={max.toString()}
          />
        </span>
        <span>
          {#if currentFrequency === "days"}
            dagen
          {:else if currentFrequency === "weeks"}
            weken
          {:else if currentFrequency === "months"}
            maanden
          {/if}
        </span>
      </FormRow>
    {/if}

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
