<script lang="ts">
  import type { ComponentType, SvelteComponent } from "svelte";
  import type { SVGAttributes } from "svelte/elements";
  // Icon imports
  import IconAdd from "./icons/add.svg?component";
  import IconChevronDown from "./icons/ic-chevron-down.svg?component";
  import IconClose from "./icons/ic-cross.svg?component";
  import IconMenu from "./icons/menu.svg?component";
  // Illustration imports
  import IllustrationLogo from "./illustrations/logo.svg?component";

  export let name: VectorName;
  export let size = 1;
  export let className: string = "";
  export let ariaHidden = false;

  // Icons
  const icons = {
    "icon-add": IconAdd,
    "icon-close": IconClose,
    "icon-menu": IconMenu,
    "icon-chevron-down": IconChevronDown,
  };

  // Illustrations
  const illustrations = {
    "illustration-logo": IllustrationLogo,
  };

  type IconName = keyof typeof icons;
  type IllustrationName = keyof typeof illustrations;
  type VectorName = IconName | IllustrationName;

  const vectors: Record<
    VectorName,
    ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>
  > = {
    ...icons,
    ...illustrations,
  };
</script>

<svelte:component
  this={vectors[name]}
  style="width: {size}em;"
  class={className}
  aria-hidden={ariaHidden}
/>
