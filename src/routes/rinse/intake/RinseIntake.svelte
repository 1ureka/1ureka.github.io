<script lang="ts">
  import { fly } from "svelte/transition";

  import { IconAlertCircleFilled, IconDropletFilled, IconLinkFilled } from "#lib/icons/index.ts";
  import HeroInput from "#lib/components/inputs/HeroInput.svelte";

  import { getRinseContext } from "../logic/rinse.svelte";

  const rinse = getRinseContext();

  /** 檔案挑選器只是投放的替代入口，藏起來由整塊投放區代為觸發 */
  let picker = $state<HTMLInputElement>();

  function handlePicked(event: Event & { currentTarget: HTMLInputElement }) {
    rinse.handlePick(event.currentTarget.files);
    // 不清空的話，連續挑同一個檔案不會再觸發 change
    event.currentTarget.value = "";
  }
</script>

<div class="intake">
  <button type="button" class="dropzone" onclick={() => picker?.click()}>
    <span class="mark"><IconDropletFilled size={26} /></span>
    <span class="lead">把圖片拖到這個視窗的任何地方</span>
    <span class="sub">
      或按 <kbd>Ctrl</kbd> <kbd>V</kbd> 貼上，也可以點這裡從電腦選檔案
    </span>
  </button>

  <input
    bind:this={picker}
    type="file"
    class="sr-only"
    accept="image/*"
    multiple
    tabindex="-1"
    aria-hidden="true"
    onchange={handlePicked}
  />

  <div class="divider"><span>或貼上圖片連結</span></div>

  <HeroInput
    bind:input={rinse.inputEl}
    label="圖片連結"
    placeholder="貼上圖片網址，例如 https://example.com/photo.jpg"
    action="沖洗"
    value={rinse.input}
    pending={rinse.pending > 0}
    oninput={rinse.handleInput}
    onsubmit={rinse.handleSubmit}
  >
    {#snippet icon()}
      <IconLinkFilled size={17} />
    {/snippet}
  </HeroInput>

  {#if rinse.error !== null}
    <p class="error" role="alert" transition:fly={{ y: -6, duration: 180 }}>
      <span class="error-icon"><IconAlertCircleFilled size={16} /></span>
      <span>{rinse.error}</span>
    </p>
  {/if}

  <p class="note">多數網站不允許其他網站直接取用它的圖片，拖曳圖片則不受這個限制。</p>
</div>

<style>
  .intake {
    max-width: 40rem;
    margin: 0 auto;
  }

  .dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 2.5rem 1.5rem;
    text-align: center;

    color: var(--color-text-muted);
    background-color: transparent;
    border: var(--border-style);
    border-style: dashed;
    border-radius: var(--radius-md);
    transition:
      color 0.18s var(--ease),
      background-color 0.18s var(--ease),
      border-color 0.18s var(--ease);

    &:hover {
      color: var(--color-accent);
      background-color: var(--color-accent-tint);
      border-color: var(--color-accent);
    }
  }

  .mark {
    display: grid;
    place-items: center;
    color: var(--color-accent);
  }

  .lead {
    font: var(--font-title3);
    color: var(--color-text);
  }

  .dropzone:hover .lead {
    color: var(--color-accent);
  }

  .sub {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font: var(--font-body1);
    color: inherit;
  }

  kbd {
    font: var(--font-kbd);
    padding: 0.1em 0.4em;
    background-color: var(--color-bg-card);
    border: var(--border-style);
    border-radius: var(--radius-sm);
    box-shadow: 0 2.5px 0 var(--color-border);
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    margin: 1.625rem 0 1.125rem;
    font: var(--font-caption);
    color: var(--color-text-muted);

    &::before,
    &::after {
      content: "";
      flex: 1;
      border-top: var(--border-style);
    }
  }

  .error {
    display: flex;
    gap: 0.625rem;
    align-items: flex-start;
    margin-top: 0.875rem;
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

  .note {
    margin-top: 0.875rem;
    font: var(--font-caption);
    line-height: 1.6;
    color: var(--color-text-muted);
    text-wrap: pretty;
  }
</style>
