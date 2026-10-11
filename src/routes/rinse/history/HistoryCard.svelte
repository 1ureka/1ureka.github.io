<script lang="ts">
  import { IconAdjustments, IconCheck, IconCopy, IconDownload, IconPhotoFilled, IconTrash } from "$lib/icons";
  import { tooltip } from "$lib/components/floating/tooltip.core.svelte";
  import { formatBytes, formatRelative } from "$lib/utils/shared";

  import { getRinseContext } from "../logic/rinse.svelte";
  import { getRinseHistoryContext } from "../logic/history.svelte";
  import { readBlob, readPreview, type RinseRecord } from "../logic/store";

  let { record, onsaveas }: { record: RinseRecord; onsaveas: (record: RinseRecord) => void } = $props();

  const rinse = getRinseContext();
  const history = getRinseHistoryContext();

  const filename = $derived(`${record.name}.png`);
  const checked = $derived(history.isChecked(record.id));
  /** 已經有勾選時，點整張卡就是勾選；否則是放大檢視 */
  const selecting = $derived(history.selection.length > 0);

  /**
   * 虛擬化每次捲動都會給出新的項目物件，直接讀 record 等於訂閱整個項目；
   * 隔一層 derived 的相等檢查，下面的 effect 才只在 id 真的換了時重跑，
   * 否則每次捲動都會重讀預覽、換一個新的 blob URL，整張卡跟著重繪
   */
  const id = $derived(record.id);

  let src = $state<string | null>(null);
  let failed = $state(false);

  // 卡片只在出現於畫面上時才被掛載（虛擬化），預覽圖就在這時讀，卸載時放掉
  $effect(() => {
    let url: string | null = null;
    let cancelled = false;

    readPreview(id)
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        src = url;
      })
      .catch(() => {
        if (!cancelled) failed = true;
      });

    return () => {
      cancelled = true;
      if (url !== null) URL.revokeObjectURL(url);
    };
  });

  function handleMain() {
    if (selecting) history.handleToggleCheck(record.id);
    else void history.handleOpen(record);
  }
</script>

<div class="card" class:checked class:selecting>
  <button type="button" class="main" onclick={handleMain}>
    {#if src !== null}
      <img {src} alt="" draggable="false" />
    {:else}
      <span class="placeholder" class:failed><IconPhotoFilled size={22} /></span>
    {/if}
    <span class="sr-only">{selecting ? `勾選 ${filename}` : `放大 ${filename}`}</span>
  </button>

  <button
    type="button"
    class="check"
    role="checkbox"
    aria-checked={checked}
    onclick={() => history.handleToggleCheck(record.id)}
  >
    {#if checked}
      <IconCheck size={13} />
    {/if}
    <span class="sr-only">勾選 {filename}</span>
  </button>

  <div class="overlay">
    <div class="info">
      <span class="name ellipsis">{filename}</span>
      <span class="sub ellipsis">
        {record.width}×{record.height} · {formatBytes(record.size)} · {formatRelative(record.createdAt)}
      </span>
    </div>

    <div class="actions">
      <button type="button" onclick={() => history.handleDownload(record)} {@attach tooltip({ content: "下載 PNG" })}>
        <IconDownload size={17} />
        <span class="sr-only">下載 {filename}</span>
      </button>
      <button type="button" onclick={() => onsaveas(record)} {@attach tooltip({ content: "另存為…" })}>
        <IconAdjustments size={17} />
        <span class="sr-only">另存為其他格式或尺寸</span>
      </button>
      <button
        type="button"
        onclick={() => rinse.handleCopy(readBlob(record.id))}
        {@attach tooltip({ content: "複製 PNG 到剪貼簿" })}
      >
        <IconCopy size={17} />
        <span class="sr-only">複製 {filename}</span>
      </button>
      <button
        type="button"
        onclick={() => history.handleDelete([record.id])}
        {@attach tooltip({ content: "自歷史刪除" })}
      >
        <IconTrash size={17} />
        <span class="sr-only">自歷史刪除 {filename}</span>
      </button>
    </div>
  </div>
</div>

<style>
  .card {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--radius-control);
    outline: 2px solid transparent;
    outline-offset: -2px;
    transition: outline-color 0.15s var(--ease);

    /* 沖洗的結果可能帶透明；棋盤格讓「這裡沒有東西」與「這裡是白的」分得開 */
    background-color: var(--color-bg-subtle);
    background-image:
      linear-gradient(45deg, var(--color-bg-active) 25%, transparent 25%),
      linear-gradient(-45deg, var(--color-bg-active) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--color-bg-active) 75%),
      linear-gradient(-45deg, transparent 75%, var(--color-bg-active) 75%);
    background-size: 12px 12px;
    background-position:
      0 0,
      0 6px,
      6px -6px,
      -6px 0;

    &.checked {
      outline: 3px solid var(--color-accent);
      outline-offset: -3px;
    }
  }

  .main {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background: none;
    cursor: zoom-in;

    .selecting & {
      cursor: pointer;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.25s var(--ease);

    .checked & {
      transform: scale(0.94);
      border-radius: calc(var(--radius-control) * 0.6);
    }
  }

  .placeholder {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    color: var(--color-border);

    &.failed {
      color: var(--color-error);
    }
  }

  .check {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    display: grid;
    place-items: center;
    width: 1.375rem;
    height: 1.375rem;
    color: var(--color-accent-text);
    background-color: rgba(0, 0, 0, 0.35);
    border: 2px solid rgba(255, 255, 255, 0.85);
    border-radius: 7px;
    opacity: 0;
    transition:
      opacity 0.15s var(--ease),
      background-color 0.15s var(--ease),
      border-color 0.15s var(--ease);

    &[aria-checked="true"] {
      background-color: var(--color-accent);
      border-color: var(--color-accent);
    }
  }

  /* 勾選框平常藏著；滑過、聚焦、已勾選、或正在勾選時才出現 */
  .card:hover .check,
  .card:focus-within .check,
  .selecting .check,
  .check[aria-checked="true"] {
    opacity: 1;
  }

  .overlay {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 1.75rem 0.625rem 0.5rem;
    color: #fff;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.45) 60%, transparent);
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.15s var(--ease),
      transform 0.15s var(--ease);
    pointer-events: none;
  }

  .card:hover .overlay,
  .card:focus-within .overlay {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  /* 勾選時整張卡都是勾選的熱區，操作列讓開 */
  .selecting .overlay {
    display: none;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }

  .name {
    font: var(--font-title4);
  }

  .sub {
    font: var(--font-caption);
    opacity: 0.8;
  }

  .actions {
    display: flex;
    gap: 0.125rem;

    & button {
      display: grid;
      place-items: center;
      width: 2rem;
      height: 2rem;
      color: #fff;
      border-radius: var(--radius-sm);
      transition: background-color 0.15s var(--ease);

      &:hover {
        background-color: rgba(255, 255, 255, 0.18);
      }
    }
  }
</style>
