<script lang="ts">
  import { useQueryClient } from "@tanstack/svelte-query";
  import { t } from "svelte-i18n";
  import ProjectList from "$components/ProjectList/ProjectList.svelte";
  import Text from "$components/Text/Text.svelte";
  import TodoForm from "$components/TodoForm/TodoForm.svelte";
  import TopBar from "$components/TopBar/TopBar.svelte";
  import TodoHeadingConnector from "$examples/svelte-query/components/TodoHeadingConnector.svelte";
  import TodoList from "$examples/svelte-query/components/TodoList.svelte";
  import { TODOS_QUERY_KEYS } from "$examples/svelte-query/core/services/todos/queries/keys";
  import projectsQueries from "$examples/svelte-query/core/services/todos/queries/projectsQueries";
  import todosQueries from "$examples/svelte-query/core/services/todos/queries/todosQueries";
  import projectsStore from "$stores/projects";

  let editTodoId = "";

  const queryClient = useQueryClient();
  const projectsQuery = projectsQueries.getAllProjects();
  const todosQuery = todosQueries.getAllTodos();
  const updateQuery = todosQueries.updateTodo();
  const { setActiveProject, activeProjects } = projectsStore;

  $: editTodo = $todosQuery.data?.find((todo) => todo.id === editTodoId);
  $: filteredTodos = () =>
    $activeProjects.length > 0
      ? $todosQuery.data?.filter((todo) =>
          $activeProjects.includes(todo.project?.slug || ""),
        )
      : $todosQuery.data;
  $: todos = filteredTodos();

  function onSubmit(event: Event) {
    const { description, dueDate, projects } = event.target as HTMLFormElement;
    const project = $projectsQuery.data?.find(
      (projectObj) => projectObj.id === projects?.value,
    );
    $updateQuery.mutate(
      {
        id: editTodoId,
        description: description.value,
        dueDate: dueDate.value,
        project,
      },
      {
        onSuccess: async () => {
          cancelEditing();
          await queryClient.invalidateQueries({
            queryKey: [TODOS_QUERY_KEYS.TODOS_ALL],
          });
        },
      },
    );
  }

  function openEditing(e: CustomEvent<string>) {
    editTodoId = e.detail;
  }

  function cancelEditing() {
    editTodoId = "";
  }
</script>

<TopBar>
  <div slot="project-list">
    <section class="container spacing">
      <div class="heading">
        <Text variant="h3" styling="body-sm">{$t("projects")}</Text>
      </div>

      <ProjectList
        on:toggle-project={(e) => setActiveProject(e.detail)}
        projects={$projectsQuery.data || []}
        activeProjects={$activeProjects}
      />
    </section>
  </div>
</TopBar>
<div class="wrapper">
  <div class="sidepanel">
    {#if $projectsQuery.status === "pending"}
      <span>Loading projects...</span>
    {:else if $projectsQuery.status === "error"}
      <span>Error: {$projectsQuery.error.message}</span>
    {:else}
      <aside class="filter">
        <Text variant="h3" styling="body-sm">{$t("projects")}</Text>
        <ProjectList
          on:toggle-project={(e) => setActiveProject(e.detail)}
          projects={$projectsQuery.data}
          activeProjects={$activeProjects}
        />
      </aside>
    {/if}
  </div>

  <div class="list">
    <TodoHeadingConnector projects={$projectsQuery.data} />

    {#if $todosQuery.status === "pending"}
      <span>Loading todos...</span>
    {:else if $todosQuery.status === "error"}
      <span>Error: {$todosQuery.error.message}</span>
    {:else}
      <TodoList todos={todos || []} on:edit={openEditing} />
    {/if}
  </div>
</div>

<TodoForm
  showModal={!!editTodoId}
  on:close={cancelEditing}
  on:submit={onSubmit}
  isLoading={$updateQuery.isPending}
  projects={$projectsQuery.data}
  description={editTodo?.description}
  date={editTodo?.dueDate
    ? new Date(editTodo.dueDate).toISOString().split("T")[0]
    : ""}
  projectId={editTodo?.project?.id}
  submitLabel={$t("update")}
/>

<style lang="scss">
  @use "$styles/abstracts" as *;

  .wrapper {
    display: flex;
    justify-content: center;
    padding: 3rem var(--spacing-16);
  }

  .sidepanel {
    display: none;
    min-width: 20rem;
    margin-top: var(--spacing-16);

    @include responsive-min($breakpoint-tablet) {
      display: flex;
      flex-direction: column;
    }
  }

  .filter {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);

    min-width: 20rem;
    margin-top: var(--spacing-16);
    padding: 0 var(--spacing-24);
  }

  .list {
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);
    padding: 0 1rem;

    @include responsive-min($breakpoint-small-tablet) {
      padding: 0 2.5rem;
    }
  }

  .spacing {
    margin: var(--spacing-24) 0;
  }

  .heading {
    font-weight: 600;
    color: var(--tc-text-secondary);
  }
</style>
