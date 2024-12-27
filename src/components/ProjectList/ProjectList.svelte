<script lang="ts">
  import type { Project } from "$models/project";
  import ProjectItem from "./ProjectItem.svelte";

  export let projects: Project[];
  export let activeProjects: string[];
</script>

<ul class="list">
  {#each projects as project}
    <li class="list-item">
      <ProjectItem
        {project}
        isActive={activeProjects.includes(project.slug)}
        on:toggle-project
      />
    </li>
  {/each}
</ul>

<style lang="scss">
  .list {
    flex-direction: column;
    gap: var(--gutter);

    width: 100%;
    margin: 0;
    padding: 0;

    list-style: none;
  }

  .list-item {
    width: 100%;
    text-align: right;

    & + & {
      margin-top: var(--spacing-24);
    }
  }
</style>
