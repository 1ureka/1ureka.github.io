<script lang="ts">
  import { fly } from "svelte/transition";

  import { IconKeyboard, IconNotification, IconMoon, IconSun } from "#lib/icons";
  import Button from "#lib/components/actions/Button.svelte";
  import { tooltip } from "#lib/components/floating/tooltip.core.svelte.ts";
  import { showToasts } from "#lib/components/floating/toast-events.ts";

  import { getToolContext } from "../logic/tool.svelte";
  import { getThemeContext } from "../logic/theme.svelte";
  import { getShortcutsContext } from "../logic/shortcuts.svelte";
  import ToolSwitch from "./ToolSwitch.svelte";
  import { TOOLS } from "./config";

  const tool = getToolContext();
  const theme = getThemeContext();
  const shortcuts = getShortcutsContext();

  const active = $derived(TOOLS[tool.current]);
</script>

<header>
  <div class="inner">
    <div class="identity">
      {#key tool.current}
        <h1 in:fly={{ y: -6, duration: 200 }}>
          <span class="mark">
            <active.Icon size={active.markSize} color="var(--color-accent-text)" />
          </span>
          {active.name}
        </h1>
      {/key}
      <span class="divider"></span>
      <ToolSwitch />
    </div>

    <div class="actions">
      <Button variant="ghost" padding="icon" onclick={showToasts} {@attach tooltip({ content: "通知歷史" })}>
        <IconNotification size={22} />
        <span class="sr-only">通知歷史</span>
      </Button>

      <Button
        variant="ghost"
        padding="icon"
        onclick={shortcuts.handleOpen}
        {@attach tooltip({ content: "鍵盤快速鍵（?）" })}
      >
        <IconKeyboard size={22} />
        <span class="sr-only">鍵盤快速鍵</span>
      </Button>

      <Button variant="ghost" padding="icon" onclick={theme.handleToggle} {@attach tooltip({ content: "切換主題" })}>
        {#if theme.current === "dark"}
          <IconMoon size={22} />
        {:else}
          <IconSun size={22} />
        {/if}
        <span class="sr-only">切換主題</span>
      </Button>
    </div>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: color-mix(in srgb, var(--color-bg) 70%, transparent);
    backdrop-filter: blur(10px) saturate(1.1);
    border-bottom: var(--border-style);
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    max-width: var(--wrap-max);
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
  }

  .identity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  h1 {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font: var(--font-title3);
    letter-spacing: 0.08em;
    white-space: nowrap;
  }

  .mark {
    display: grid;
    place-items: center;
    width: 1.875rem;
    height: 1.875rem;
    flex-shrink: 0;
    border-radius: 9px;
    background-color: var(--color-accent);
    box-shadow: var(--shadow-sm);
  }

  .divider {
    height: 1.125rem;
    border-right: var(--border-style);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    .inner {
      padding: 0.75rem 1rem;
    }

    .divider {
      display: none;
    }
  }
</style>
