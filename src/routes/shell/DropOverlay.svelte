<script lang="ts">
  import { fade, scale } from "svelte/transition";

  import { getDropzoneContext } from "../logic/dropzone.svelte";
  import { getToolContext } from "../logic/tool.svelte";
  import { TOOLS } from "./config";

  const dropzone = getDropzoneContext();
  const tool = getToolContext();

  const active = $derived(TOOLS[tool.current]);
</script>

{#if dropzone.active}
  <div class="overlay" transition:fade={{ duration: 120 }} aria-hidden="true">
    <div class="frame" in:scale={{ duration: 200, start: 0.97, opacity: 0 }}>
      <active.DropIcon size={30} />
      <p>{active.dropHint}</p>
      <span>目前的工具是 {active.name}</span>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 1.5rem;

    /* 提示只是視覺回饋，絕不能攔下拖曳事件，否則進出計數與 drop 都會失準 */
    pointer-events: none;

    background-color: color-mix(in srgb, var(--color-bg) 82%, transparent);
    backdrop-filter: blur(3px);
  }

  .frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: min(100%, 34rem);
    padding: 3rem 2rem;
    text-align: center;

    color: var(--color-accent);
    background-color: var(--color-accent-tint);
    border: 2px dashed var(--color-accent);
    border-radius: var(--radius-lg);
  }

  p {
    font: var(--font-title3);
    color: var(--color-accent);
  }

  span {
    font: var(--font-caption);
    color: var(--color-text-muted);
  }
</style>
