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
  export let hourEstimate: number;

  const { locale } = $page.params;

  const dispatch = createEventDispatcher<{
    edit: string;
    delete: void;
    done: void;
  }>();
</script>

<Card {done}>
  <article class="wrapper" class:done>
    <Checkbox
      {id}
      checked={!!done}
      on:change={() => dispatch("done")}
      disabled={isDeleting || isDoneChanging}
    />
    <div>
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
      <span>
        <Text variant="p" styling="body">
          {hourEstimate} uur
        </Text>
      </span>
    </div>
  </article>
</Card>

<style lang="scss">
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
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
