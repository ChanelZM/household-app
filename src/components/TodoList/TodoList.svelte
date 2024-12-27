<script lang="ts">
  import { t } from "svelte-i18n";
  import type { Todo } from "$models/todo";
  import TodoItemConnector from "$connectors/TodoItemConnector.svelte";
  import sortTodosByDueDate from "$utils/sortTodosByDueDate";

  export let todos: Todo[];

  $: sortedTodos = sortTodosByDueDate(todos);
  $: unCompletedTodos = sortedTodos.filter((todo) => !todo.done);
  $: completedTodos = sortedTodos.filter((todo) => todo.done === true);
</script>

<ul class="list">
  {#each unCompletedTodos as todo}
    <li class="list-item">
      <TodoItemConnector
        id={todo.id}
        description={todo.description}
        project={todo.project}
        dueDate={todo.dueDate}
        done={todo.done}
        on:edit
        on:refresh
      />
    </li>
  {:else}
    <p>{$t("nothingFound")}</p>
  {/each}
</ul>

<hr class="line" />

<ul class="list">
  {#each completedTodos as todo}
    <li class="list-item">
      <TodoItemConnector
        id={todo.id}
        description={todo.description}
        project={todo.project}
        dueDate={todo.dueDate}
        done={todo.done}
        on:refresh
        on:edit
      />
    </li>
  {/each}
</ul>

<style lang="scss">
  @use "$styles/abstracts" as *;

  .list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);

    width: 100%;
    padding: 0;

    color: var(--tc-text-primary);
    list-style: none;

    background-color: var(--tc-background-primary);

    @include responsive-min($breakpoint-small-tablet) {
      display: grid;
      grid-auto-rows: max-content;
      grid-gap: var(--spacing-24);
      grid-template-columns: repeat(
        auto-fill,
        minmax(max(18.75rem, 20vw), 1fr)
      );
    }

    @include responsive-min($breakpoint-laptop-big) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .line {
    margin: 2rem 0;
    border: 1px solid var(--tc-decoration);
  }
</style>
