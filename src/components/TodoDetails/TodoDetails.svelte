<script lang="ts">
  import dayjs from "dayjs";
  import { t } from "svelte-i18n";
  import Card from "../Card/Card.svelte";
  import Text from "../Text/Text.svelte";

  export let id: string;
  export let description: string;
  export let project: string | undefined = undefined;
  export let dueDate: string | undefined = undefined;
</script>

<Card>
  <article class="wrapper">
    <div class="name">
      <Text
        variant="h2"
        styling="section"
        testId="tododetails-description"
        className="name"
      >
        {description}
      </Text>
    </div>
    <div class="item">
      <Text
        variant="span"
        styling="copy"
        testId="tododetails-project"
        className="item"
      >
        {$t("project")}:
        {project}
      </Text>
    </div>
    {#if dueDate}
      <div class="item">
        <Text
          variant="span"
          styling="copy"
          testId="tododetails-date"
          className="item"
        >
          {$t("dueDate")}:
          {dayjs(dueDate).format("DD MMM YYYY")}
        </Text>
      </div>
    {/if}
    {#if id}
      <div class="item">
        <Text
          variant="span"
          styling="copy"
          testId="tododetails-id"
          className="item"
        >
          {$t("id")}:
          {id}
        </Text>
      </div>
    {/if}
  </article>
</Card>

<style lang="scss">
  .wrapper {
    position: relative;

    display: flex;
    flex-direction: column;

    height: auto;
    padding: var(--spacing-24);
  }

  .name {
    color: var(--tc-text-secondary);
  }

  .item {
    margin-top: var(--spacing-24);
    color: var(--tc-text-secondary);
  }
</style>
