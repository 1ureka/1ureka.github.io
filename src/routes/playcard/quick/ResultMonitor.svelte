<script lang="ts">
  import { fade } from "svelte/transition";

  import { IconPlayerPlayFilled } from "$lib/icons";
  import { formatClock } from "$lib/utils/shared";
  import type { VideoCard } from "$lib/oembed";
  import { getLightboxContext } from "../../logic/lightbox.svelte";

  let { card }: { card: VideoCard } = $props();

  const lightbox = getLightboxContext();

  /** 是否已切換成官方播放器；換影片時整個元件會被重建，因此不需要自行重設 */
  let playing = $state(false);
</script>

<div class="monitor">
  <div class="frame">
    {#if playing}
      <iframe
        src="https://www.youtube.com/embed/{card.videoId}?autoplay=1"
        title={card.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    {:else}
      <img src={card.thumbnailUrl} alt={card.title} out:fade={{ duration: 150 }} />
      <button
        type="button"
        class="play"
        title="在此播放"
        onclick={() => (playing = true)}
        ondblclick={() => lightbox.handleOpen(card.thumbnailUrl, card.title)}
      >
        <span><IconPlayerPlayFilled size={20} /></span>
        <span class="sr-only">播放預覽</span>
      </button>
    {/if}

    <div class="tick tl"></div>
    <div class="tick tr"></div>
    <div class="tick bl"></div>
    <div class="tick br"></div>
  </div>

  <div class="readout">
    <span class="dot" class:cached={card.fromCache}></span>
    <span>{card.fromCache ? "快取讀取" : "即時讀取"}</span>
    <span>·</span>
    <span><b>{card.width ?? "—"} × {card.height ?? "—"}</b></span>
    <span>·</span>
    <span>{card.providerName}</span>
    <span>·</span>
    <span>ID {card.videoId}</span>
    <span class="spacer"></span>
    <span>讀取於 {formatClock(card.fetchedAt)}</span>
  </div>
</div>

<style>
  .monitor {
    position: relative;
    padding: 0.875rem;
    background-color: var(--color-screen);
  }

  .frame {
    position: relative;
    aspect-ratio: 16 / 9;
    background-color: #000;
    border-radius: var(--radius-control);
    overflow: hidden;
  }

  /* 絕對定位，換成播放器時淡出的縮圖才會疊在原位，而不是把 iframe 擠到框外 */
  img,
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border: none;
  }

  .play {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 0;
    background-color: rgba(0, 0, 0, 0.15);
    border: none;

    & > span {
      display: grid;
      place-items: center;
      width: 3.5rem;
      height: 3.5rem;
      padding-left: 3px;
      color: var(--color-screen);
      background-color: rgba(255, 255, 255, 0.92);
      border-radius: 50%;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      transition: transform 0.18s var(--ease);
    }

    &:hover > span {
      transform: scale(1.08);
    }
  }

  .tick {
    position: absolute;
    width: 10px;
    height: 10px;
    border-color: var(--color-screen-tick);
    pointer-events: none;
  }

  .tl {
    top: 6px;
    left: 6px;
    border-top: 2px solid;
    border-left: 2px solid;
  }
  .tr {
    top: 6px;
    right: 6px;
    border-top: 2px solid;
    border-right: 2px solid;
  }
  .bl {
    bottom: 6px;
    left: 6px;
    border-bottom: 2px solid;
    border-left: 2px solid;
  }
  .br {
    bottom: 6px;
    right: 6px;
    border-bottom: 2px solid;
    border-right: 2px solid;
  }

  .readout {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 1rem;
    margin-top: 0.875rem;
    padding-top: 0.625rem;
    font: var(--font-mono);
    color: var(--color-screen-text);
    border-top: var(--border-style);
    border-color: var(--color-screen-line);
  }

  .readout b {
    font-weight: 600;
    color: var(--color-screen-text-strong);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--color-success);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-success) 25%, transparent);
  }

  .dot.cached {
    background-color: var(--color-screen-text);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-screen-text) 20%, transparent);
  }

  .spacer {
    flex: 1;
  }
</style>
