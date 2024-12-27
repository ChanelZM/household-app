<script lang="ts">
  import dayjs from "dayjs";
  import { createEventDispatcher } from "svelte";
  import type { Project } from "$models/project";
  import { page } from "$app/stores";
  import Checkbox from "$components/Checkbox/Checkbox.svelte";
  import Button from "../Button/Button.svelte";
  import Card from "../Card/Card.svelte";
  import Stack from "../Stack/Stack.svelte";
  import Text from "../Text/Text.svelte";

  export let id: string;
  export let description: string;
  export let project: Project | undefined = undefined;
  export let done: boolean | undefined = undefined;
  export let dueDate: string | undefined = undefined;
  export let isDeleting = false;
  export let isDoneChanging = false;

  const { locale } = $page.params;

  const dispatch = createEventDispatcher<{
    edit: string;
    delete: void;
    done: void;
  }>();
</script>

<Card {done}>
  <article class="wrapper" class:done>
    <div class="checkbox">
      <Checkbox
        checked={!!done}
        on:change={() => dispatch("done")}
        disabled={isDeleting || isDoneChanging}
      >
        {done ? "Done" : "Open"}
      </Checkbox>
    </div>
    <div class="header">
      <Text
        variant="h2"
        styling="section"
        className="description"
        testId="todoitem-description"
      >
        <a href={`${locale}/todo/${id}`}>
          {description}
        </a>
      </Text>
    </div>

    <div class="body">
      {#if project}
        <div class="project">
          <Text styling="subhead-sm" testId="todoitem-project-label"
            >{project.name}</Text
          >
        </div>
      {/if}

      <div class={done ? "tag-done" : "tag"}>
        <Text variant="span" styling="copy">
          {done ? "Done" : "Todo"}
        </Text>
      </div>

      {#if dueDate}
        <div class="due-date">
          <Text variant="span" styling="copy" testId="todoitem-date-label">
            {dayjs(dueDate).format("DD MMM YYYY")}
          </Text>
        </div>
      {/if}
    </div>

    <div class="actions">
      <Stack align="start" horizontal smallGap wrap>
        <Button
          on:click={() => dispatch("edit", id)}
          type="button"
          small
          fullwidth
          variant="primary-outline"
          disabled={isDeleting || isDoneChanging}
          testId="todoitem-button-edit"
        >
          Edit
        </Button>
        <Button
          on:click={() => dispatch("delete")}
          type="button"
          small
          fullwidth
          disabled={isDoneChanging}
          testId="todoitem-button-delete"
        >
          Delete
        </Button>
      </Stack>
    </div>
  </article>
</Card>

<style lang="scss">
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 20rem; /* 320px */
  }

  .header {
    display: flex;
  }

  .checkbox {
    margin: 0 0 1rem auto;
    padding: 0.2rem 0 0 1rem;
  }

  .project {
    margin-top: var(--spacing-8);
    color: var(--tc-text-primary);
  }

  .due-date {
    margin-top: var(--spacing-24);
    color: var(--tc-text-primary);
  }

  .actions {
    margin-top: auto;
  }

  .tag {
    width: fit-content;
    margin-top: var(--spacing-16);
    padding: 0.375rem;

    color: var(--tc-background-primary);
    text-transform: uppercase;

    background-color: var(--tc-error);
  }

  .tag-done {
    width: fit-content;
    margin-top: var(--spacing-16);
    padding: 0.375rem;

    color: var(--tc-background-primary);
    text-transform: uppercase;

    background-color: var(--tc-success);
  }
</style>
