import {
  PROJECTS_QUERY_KEYS,
  TODOS_QUERY_KEYS,
} from "$examples/svelte-query/core/services/todos/queries/keys";
import { fetchProjects, fetchTodos } from "$services/todos/index";
import projectsStore from "$stores/projects";
import type { PageLoad } from "../../examples/svelte-query/$types"; // Obsolete when example actually used in project

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: [PROJECTS_QUERY_KEYS.PROJECTS_ALL],
    queryFn: fetchProjects,
  });

  await queryClient.prefetchQuery({
    queryKey: [TODOS_QUERY_KEYS.TODOS_ALL],
    queryFn: fetchTodos,
  });
  projectsStore.setProjects([]);
};
