<script lang="ts">
  import { locale } from "svelte-i18n";
  import { t } from "svelte-i18n";
  import Text from "$components/Text/Text.svelte";

  //   TODO: Find a way to make dynamic list of pages
  const examples = [
    {
      title: "Svelte Query",
      href: `/${$locale}/examples/svelte-query`,
    },
  ];
</script>

<section class="wrapper">
  <Text variant="h1" styling="heading1">
    {$t("examples")}
  </Text>

  <ul class="list">
    {#each examples as example}
      <li class="item">
        <a href={example.href}>{example.title}</a>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem var(--spacing-16);
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-24);
    align-items: center;

    margin: 0;
    margin-top: var(--spacing-40);
    padding: 0;

    color: var(--tc-text-primary);
  }

  .item {
    color: var(--tc-text-primary);
    text-decoration: none;

    &:hover {
      color: var(--tc-text-tertiary);
    }
  }
</style>
