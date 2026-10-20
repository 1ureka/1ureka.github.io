<script lang="ts">
  import Popover from "#lib/components/floating/Popover.svelte";
  import { formatHex } from "#lib/utils/color.ts";
  import { LOUPE_GRID, PICKER_KEY, type Picker } from "./picker.svelte";

  let { picker }: { picker: Picker } = $props();

  const hex = $derived(formatHex(picker.live));
</script>

<!--
  參照點是游標本身，跟隨方式與 tooltip 相同；點下去時以同一個 key 變形成結果面板。
  放大鏡不能攔截指標：剛出現、位置還沒算好的那一瞬間若蓋到游標，圖片就會收到 pointerleave 而把它關掉。
-->
<Popover
  style="pointer-events: none;"
  open={picker.mode === "picking" && picker.hovering}
  reference={picker.pointer}
  placement="top"
  offset={14}
  arrow
  arrowColor="var(--color-bg-popover)"
  crossfadeKey={PICKER_KEY}
>
  <div class="loupe" aria-hidden="true" style:--grid={LOUPE_GRID}>
    <div class="lens">
      <canvas width={LOUPE_GRID} height={LOUPE_GRID} {@attach picker.loupe}></canvas>
    </div>
    <div class="caption">
      <span class="dot" style:background-color={hex}></span>
      {hex}
    </div>
  </div>
</Popover>

<style>
  .loupe {
    padding: 0.375rem;
    background-color: var(--color-bg-popover);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
  }

  /* 每個像素放大成 10px 見方 */
  .lens {
    position: relative;
    width: calc(var(--grid) * 10px);
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: var(--radius-sm);
    background-color: var(--color-screen);

    /* 像素格線 */
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(to right, var(--color-screen-line) 1px, transparent 1px),
        linear-gradient(to bottom, var(--color-screen-line) 1px, transparent 1px);
      background-size: calc(100% / var(--grid)) calc(100% / var(--grid));
    }

    /* 中心格就是取樣點；白框加一圈暗邊，深淺底色上都看得見 */
    &::after {
      content: "";
      position: absolute;
      left: calc(100% / var(--grid) * (var(--grid) - 1) / 2);
      top: calc(100% / var(--grid) * (var(--grid) - 1) / 2);
      width: calc(100% / var(--grid));
      height: calc(100% / var(--grid));
      border: 2px solid #fff;
      border-radius: 2px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
    }
  }

  canvas {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }

  .caption {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding: 0.375rem 0 0.125rem;
    font: var(--font-caption);
    font-family: var(--font-family-mono);
    color: var(--color-text);
  }

  .dot {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }
</style>
