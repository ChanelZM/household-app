<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Project } from "$models/project";
  import { page } from "$app/stores";
  import Checkbox from "../Checkbox/Checkbox.svelte";

  export let project: Project;
  export let isActive: boolean;
  const { locale } = $page.params;

  const dispatch = createEventDispatcher<{ "toggle-project": string }>();
</script>

<Checkbox
  checked={isActive}
  on:change={() => dispatch("toggle-project", project.slug)}
>
  <a class="link" href="{locale}/project/{project.id}">{project.name}</a>
</Checkbox>

<style lang="scss">
  .link {
    color: var(--tc-text-primary);
    text-decoration: none;

    &:hover {
      color: var(--tc-text-tertiary);
    }
  }
</style>
