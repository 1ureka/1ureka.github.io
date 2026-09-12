<script lang="ts">
  import { fly } from "svelte/transition";

  import { IconAlertCircleFilled, IconArrowsShuffle, IconLinkFilled } from "$lib/icons";
  import HeroInput from "$lib/components/inputs/HeroInput.svelte";
  import Chip from "$lib/components/display/Chip.svelte";
  import { getLookupContext, EXAMPLES } from "../logic/lookup.svelte";

  const lookup = getLookupContext();
</script>

<div class="field">
  <HeroInput
    bind:input={lookup.inputEl}
    label="YouTube 影片連結"
    placeholder="貼上 YouTube 影片連結，例如 https://www.youtube.com/watch?v=..."
    action="查詢"
    value={lookup.input}
    pending={lookup.pending}
    oninput={lookup.handleInput}
    onsubmit={lookup.handleSubmit}
    onpaste={lookup.handlePaste}
  >
    {#snippet icon()}
      <IconLinkFilled size={17} />
    {/snippet}
  </HeroInput>
</div>

<div class="examples">
  <span>沒有連結？試試：</span>
  <Chip variant="outlined" onclick={() => lookup.handleUse(EXAMPLES[0])}>第一支 YouTube 影片</Chip>
  <Chip variant="outlined" onclick={lookup.handleUseRandom}>
    <IconArrowsShuffle size={13} />
    隨機挑一個
  </Chip>
</div>

{#if lookup.error !== null}
  <p class="error" role="alert" transition:fly={{ y: -6, duration: 180 }}>
    <span class="error-icon"><IconAlertCircleFilled size={16} /></span>
    <span>{lookup.error}</span>
  </p>
{/if}

<style>
  .field {
    max-width: 40rem;
    margin: 1.625rem auto 0;
  }

  .examples {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    margin-top: 0.875rem;
    font: var(--font-body2);
    color: var(--color-text-muted);
  }

  .error {
    display: flex;
    gap: 0.625rem;
    align-items: flex-start;
    max-width: 40rem;
    margin: 0.875rem auto 0;
    padding: 0.75rem 1rem;
    font: var(--font-body2);
    color: var(--color-error);
    background-color: var(--color-error-tint);
    border: var(--border-style);
    border-color: color-mix(in srgb, var(--color-error) 35%, transparent);
    border-radius: var(--radius-control);
  }

  .error-icon {
    display: inline-flex;
    flex-shrink: 0;
    margin-top: 1px;
  }
</style>
