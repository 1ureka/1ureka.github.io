<script lang="ts">
  import type { Snippet } from "svelte";
  import CircularProgress from "#lib/components/display/CircularProgress.svelte";

  /**
   * 每個工具的主角輸入：貼一個連結進去、按一下就開始。
   *
   * 這是整站唯一不套用 --control-height 的控制項——它是頁面的第一個動作，
   * 刻意比其他表單元件大一號。除此之外它沒有任何工具專屬的東西，
   * Playcard 與之後的工具共用同一個。
   *
   * 值走「狀態 in、事件 out」而不是 $bindable：呼叫端多半是 controller 的欄位，
   * 雙向綁定會讓外部直接寫進狀態，繞過 controller 自己的 handler。
   */
  interface Props {
    /** 欄位標籤，僅供螢幕閱讀器 */
    label: string;
    /** 目前的值 */
    value: string;
    /** 送出按鈕的文字 */
    action: string;
    oninput: (value: string) => void;
    onsubmit: () => void;
    placeholder?: string;
    /** 是否正在處理中；按鈕會顯示轉圈並停止接受點擊 */
    pending?: boolean;
    /** 欄位左側的圖示 */
    icon?: Snippet;
    onpaste?: () => void;
    /** 供外部快速鍵聚焦用 */
    input?: HTMLInputElement;
  }

  let {
    label,
    value,
    action,
    oninput,
    onsubmit,
    placeholder,
    pending = false,
    icon,
    onpaste,
    input = $bindable(),
  }: Props = $props();

  const componentId = $props.id();
  const inputId = `hero-input-${componentId}`;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onsubmit();
  }
</script>

<form onsubmit={handleSubmit}>
  <label class="sr-only" for={inputId}>{label}</label>

  {#if icon}
    <span class="icon">{@render icon()}</span>
  {/if}

  <input
    bind:this={input}
    id={inputId}
    type="text"
    autocomplete="off"
    spellcheck="false"
    class:with-icon={icon !== undefined}
    {placeholder}
    {value}
    oninput={(e) => oninput(e.currentTarget.value)}
    {onpaste}
  />

  <button type="submit" class:pending disabled={pending}>
    <span class="text">{action}</span>
    {#if pending}
      <span class="spinner">
        <CircularProgress size="1.125rem" color="var(--color-accent-text)" />
      </span>
    {/if}
  </button>
</form>

<style>
  form {
    --hero-height: 2.75rem;

    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem;
    background-color: var(--color-bg-card);
    border: var(--border-style);
    /* 外圓角 = 內圓角 + padding，內外才會同心 */
    border-radius: calc(var(--radius-control) + 0.375rem);
    box-shadow: var(--shadow-sm);
    transition: border-color 0.15s var(--ease);

    &:focus-within {
      border-color: var(--color-accent);
    }
  }

  .icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 1.75rem;
    color: var(--color-text-muted);
  }

  input {
    flex: 1;
    min-width: 0;
    height: var(--hero-height);
    padding: 0 0.875rem;
    font: var(--font-input-hero);
    background: transparent;
    border: none;
    border-radius: var(--radius-control);

    &.with-icon {
      padding-left: 0.25rem;
    }

    &::placeholder {
      color: var(--color-text-muted);
    }
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;

    &:hover,
    &:focus {
      background-color: transparent;
      border: none;
      outline: none;
    }
  }

  button {
    position: relative;
    flex-shrink: 0;
    height: var(--hero-height);
    padding: 0 1.25rem;
    font: var(--font-button);
    color: var(--color-accent-text);
    background-color: var(--color-accent);
    border-radius: var(--radius-control);
    transition:
      transform 0.12s var(--ease),
      background-color 0.18s var(--ease),
      opacity 0.18s var(--ease);

    &:hover {
      background-color: var(--color-accent-hover);
    }

    &:active {
      transform: scale(0.97);
    }

    &:disabled {
      opacity: 0.55;
      pointer-events: none;
    }

    &.pending .text {
      visibility: hidden;
    }
  }

  .spinner {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }
</style>
