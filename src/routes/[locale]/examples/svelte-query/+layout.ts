import initializeQueryClient from "$examples/svelte-query/utils/initializeQueryClient";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
  const queryClient = initializeQueryClient();

  return { queryClient };
};
