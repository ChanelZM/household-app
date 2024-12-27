<script lang="ts">
  import { onMount } from "svelte";
  import type { TodoDto } from "$services/todos/dtoTypes/api-get";
  import { page } from "$app/stores";
  import TodoDetails from "$components/TodoDetails/TodoDetails.svelte";
  import { fetchTodo } from "$services/todos";
  import asyncStore from "$stores/asyncStore";
  import getIdFromUrl from "$utils/getIdFromUrl";

  const todoStore = asyncStore<TodoDto>();
  const id = getIdFromUrl($page.url.pathname);

  $: description = ($todoStore.data && $todoStore.data.description) || "";
  $: dueDate = ($todoStore.data && $todoStore.data.dueDate) || "";
  $: project = ($todoStore.data && $todoStore.data.project?.name) || "";

  async function getTodo() {
    await todoStore.execute(() => fetchTodo(id));
  }
  onMount(getTodo);
</script>

<svelte:head>
  <title>Todo Page</title>
</svelte:head>

<div class="wrapper">
  {#if $todoStore.status === "pending" || ($todoStore.status === "idle" && !$todoStore.data)}
    <span>Loading todo...</span>
  {:else if $todoStore.status === "error"}
    <span>Error: {$todoStore.error}</span>
  {:else}
    <TodoDetails {id} {description} {dueDate} {project} />
  {/if}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: center;
    padding: 3rem var(--spacing-16);
  }
</style>
