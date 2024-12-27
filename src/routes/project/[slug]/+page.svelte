<script lang="ts">
  import { onMount } from "svelte";
  import type { TodoDto } from "$services/todos/dtoTypes/api-get.js";
  import { page } from "$app/stores";
  import Text from "$components/Text/Text.svelte";
  import TodoDetails from "$components/TodoDetails/TodoDetails.svelte";
  import { fetchTodos } from "$services/todos";
  import asyncStore from "$stores/asyncStore.js";
  import projectsStore from "$stores/projects";
  import getIdFromUrl from "$utils/getIdFromUrl";

  const todosStore = asyncStore<TodoDto[]>();

  const projectId = getIdFromUrl($page.url.pathname);
  const allProjects = $projectsStore.projects;
  const projectSlug = allProjects.filter((item) => item.id === projectId)[0]
    .slug;
  const selectedProject = allProjects.filter(
    (item) => item.slug === projectSlug,
  )[0];

  $: allTodos = $todosStore.data || [];
  $: todos = allTodos.filter(
    (item) => item.project?.slug === selectedProject.slug,
  );

  async function getTodos() {
    await todosStore.execute(() => fetchTodos());
  }

  onMount(getTodos);
</script>

<svelte:head>
  <title>Project Page</title>
</svelte:head>

<div class="wrapper">
  {#if $todosStore.status === "pending" || ($todosStore.status === "idle" && !$todosStore.data)}
    <span class="info">Loading todos...</span>
  {:else if $todosStore.status === "error"}
    <span class="info">Error: {$todosStore.error}</span>
  {:else}
    <ul class="list">
      <div class="heading">
        <Text variant="h1" styling="heading1" className="header"
          >{selectedProject.name}</Text
        >
      </div>
      {#each todos as todo}
        <li class="list-item">
          <TodoDetails
            id={todo.id}
            description={todo.description}
            dueDate={todo.dueDate}
            project={selectedProject.name}
          />
        </li>
      {:else}
        <p class="info">No todos</p>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: center;
    padding: 3rem var(--spacing-16);
  }

  .heading {
    display: flex;
    align-items: center;

    width: 100%;
    height: 5rem;
    margin-bottom: var(--spacing-24);

    color: var(--tc-text-primary);
  }

  .list {
    padding: 0;
    list-style: "";
  }

  .list-item {
    margin-bottom: var(--spacing-24);
  }

  .info {
    color: var(--tc-text-primary);
  }
</style>
