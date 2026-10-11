<script lang="ts">
  import { IconArrowsRightLeft } from "#lib/icons/index.ts";
  import Button from "#lib/components/actions/Button.svelte";
  import { tooltip } from "#lib/components/floating/tooltip.core.svelte.ts";
  import { getToolContext } from "../logic/tool.svelte";
  import { TOOLS } from "./config";

  const tool = getToolContext();
</script>

<Button
  variant="ghost"
  onclick={tool.handleSwitch}
  aria-label="切換到 {TOOLS[tool.next].name}"
  {@attach tooltip({ content: `切換到 ${TOOLS[tool.next].name}` })}
>
  <IconArrowsRightLeft size={13} />
  <span class="name">{tool.next}</span>
</Button>

<style>
  .name {
    font: var(--font-mono);
    letter-spacing: 0.02em;
  }
</style>
