<script lang="ts">
  import { crossfade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  import { IconColorPicker, IconCopy, IconX } from "#lib/icons";
  import Button from "#lib/components/actions/Button.svelte";
  import Popover from "#lib/components/floating/Popover.svelte";
  import { tooltip } from "#lib/components/floating/tooltip.core.svelte.ts";
  import { addToast } from "#lib/components/floating/toast-events.ts";
  import { copyText } from "#lib/utils/clipboard.ts";
  import { formatError } from "#lib/utils/shared.ts";
  import { COLOR_FORMATS, formatHex } from "#lib/utils/color.ts";
  import ChannelSlider from "./ChannelSlider.svelte";
  import { PICKER_KEY, type Picker } from "./picker.svelte";

  let { picker }: { picker: Picker } = $props();

  // 格式切換的指示器在選項之間 crossfade，和 Tabs 的膠囊同一種動態
  const [send, receive] = crossfade({ duration: 260, easing: cubicOut });
  const indicatorKey = $props.id();

  // 面板內距加邊框。定位時往右下多推這麼多，右下角的收起鈕就正好疊在原本觸發按鈕的位置
  const INSET = 12;

  const original = $derived(formatHex(picker.original));
  const { h, s, l } = $derived(picker.adjusted);

  async function handleCopy() {
    const text = picker.text;
    try {
      await copyText(text);
      addToast({ message: `已複製 ${text}`, variant: "success" });
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  }
</script>

<!--
  錨點是右下角觸發按鈕的外框，負的 offset 讓面板蓋回按鈕上、收起鈕與按鈕重疊，看起來就是按鈕展開成面板。
  與放大鏡共用 crossfade key：點下像素時，放大鏡從圖片上飛過來變成這個面板。
-->
<Popover
  open={picker.mode === "picked"}
  reference={picker.cornerEl}
  placement="top-end"
  offset={({ rects }) => ({ mainAxis: -(rects.reference.height + INSET), crossAxis: INSET })}
  crossfadeKey={PICKER_KEY}
>
  <div class="panel" role="group" aria-label="取色結果" style:--inset="{INSET}px">
    <div class="swatch">
      <button
        type="button"
        class="original"
        style:background-color={original}
        onclick={picker.handleRestore}
        {@attach tooltip({ content: "還原為原色", placement: "top" })}
      >
        <span class="sr-only">還原為原色 {original}</span>
      </button>
      <span class="adjusted" style:background-color={picker.adjustedHex}></span>
    </div>

    <div class="channels">
      <ChannelSlider
        label="H"
        name="色相"
        bind:value={picker.adjusted.h}
        max={360}
        unit="°"
        interpolation="in hsl longer hue"
        stops={["hsl(0 90% 55%)", "hsl(0 90% 55%)"]}
        color={picker.adjustedHex}
      />
      <ChannelSlider
        label="S"
        name="飽和度"
        bind:value={picker.adjusted.s}
        max={100}
        unit="%"
        stops={[`hsl(${h} 0% ${l}%)`, `hsl(${h} 100% ${l}%)`]}
        color={picker.adjustedHex}
      />
      <ChannelSlider
        label="L"
        name="亮度"
        bind:value={picker.adjusted.l}
        max={100}
        unit="%"
        stops={[`hsl(${h} ${s}% 0%)`, `hsl(${h} ${s}% 50%)`, `hsl(${h} ${s}% 100%)`]}
        color={picker.adjustedHex}
      />
    </div>

    <div class="formats" role="radiogroup" aria-label="輸出格式">
      {#each COLOR_FORMATS as format (format.id)}
        <button
          type="button"
          role="radio"
          aria-checked={picker.format === format.id}
          onclick={() => (picker.format = format.id)}
        >
          {format.label}
          {#if picker.format === format.id}
            <span class="indicator" in:receive={{ key: indicatorKey }} out:send={{ key: indicatorKey }}></span>
          {/if}
        </button>
      {/each}
    </div>

    <div class="output">
      <output class="value">{picker.text}</output>
      <Button variant="ghost" padding="icon" onclick={handleCopy} {@attach tooltip({ content: "複製" })}>
        <IconCopy size={16} />
        <span class="sr-only">複製 {picker.text}</span>
      </Button>
    </div>

    <div class="actions">
      <Button variant="ghost" onclick={picker.handleRepick}>
        <IconColorPicker size={15} />
        重新取色
      </Button>
      <Button variant="outlined" padding="icon" onclick={picker.handleDismiss}>
        <IconX size={17} />
        <span class="sr-only">收起取色結果</span>
      </Button>
    </div>
  </div>
</Popover>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 15rem;
    padding: calc(var(--inset) - 2px);
    background-color: var(--color-bg-popover);
    border: var(--border-style);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
  }

  /* --- */

  .swatch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 3rem;
    overflow: hidden;
    border-radius: var(--radius-sm);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
  }

  .original {
    position: relative;
    border-radius: 0;
    transition: filter 0.15s var(--ease);

    &:hover {
      filter: brightness(1.08);
    }

    &:focus-visible {
      outline-offset: -4px;
    }
  }

  .adjusted {
    transition: background-color 0.15s var(--ease);
  }

  /* --- */

  .channels {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  /* --- */

  .formats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    padding: 3px;
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-radius: var(--radius-pill);
  }

  .formats > button {
    position: relative;
    height: 1.75rem;
    font: var(--font-caption);
    font-weight: 600;
    color: var(--color-text-muted);
    border-radius: var(--radius-pill);
    transition: color 0.18s var(--ease);

    &:hover {
      color: var(--color-text);
    }

    &[aria-checked="true"] {
      color: color-mix(var(--color-accent) 85%, var(--color-text));
    }
  }

  .indicator {
    position: absolute;
    inset: 0;
    background-color: hsl(from var(--color-accent) h s l / 0.2);
    border-radius: var(--radius-pill);
    box-shadow: var(--shadow-sm);
  }

  /* --- */

  .output {
    display: flex;
    align-items: center;
    padding-left: 0.75rem;
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-radius: var(--radius-sm);
  }

  .value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    font: var(--font-mono);
    white-space: nowrap;
    text-overflow: ellipsis;
    user-select: all;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
