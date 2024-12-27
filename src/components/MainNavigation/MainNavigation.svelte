<nav>
  <ul class="list">
    <li class="item">
      <a class="link" href="/" data-testid="homepage-home-button">Home</a>
    </li>
  </ul>
</nav>

<style lang="scss">
  @use "$styles/abstracts" as *;

  .list {
    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 0;

    list-style-type: none;

    @include responsive-min($breakpoint-tablet) {
      flex-direction: row;
    }
  }

  .item {
    padding: 0.75rem 0;

    @include responsive-min($breakpoint-tablet) {
      padding: 0.75rem 1rem;
    }
  }

  .link {
    display: block;
    width: 100%;
    color: var(--tc-text-primary);
    text-decoration: none;

    &:hover {
      color: var(--tc-text-tertiary);
    }
  }
</style>
