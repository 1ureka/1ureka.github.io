<script lang="ts">
  import { Spring } from "svelte/motion";

  interface Props {
    /** 通道代號，顯示在軌道左側 */
    label: string;
    /** 無障礙名稱 */
    name: string;
    /** 目前值，範圍 0–max */
    value: number;
    max: number;
    /** 數值的顯示單位 */
    unit: string;
    /** 軌道漸層的色標，由左至右 */
    stops: string[];
    /** 漸層的插值方式，例如 `in hsl longer hue` */
    interpolation?: string;
    /** 滑塊的填色 */
    color: string;
  }

  let { label, name, value = $bindable(), max, unit, stops, interpolation = "", color }: Props = $props();

  let railEl = $state<HTMLDivElement>();
  let dragging = $state(false);

  // 滑塊位置和 Popover 座標同一套 Spring：點在軌道上時彈過去，拖曳中改成 instant 跟手
  // 第一次直接就定位，和 Popover 的 firstUpdate 同理，免得一打開就從 0 彈過來
  const position = new Spring(0, { stiffness: 0.2, damping: 0.75 });
  let placed = false;

  $effect(() => {
    position.set(value / max, { instant: dragging || !placed });
    placed = true;
  });

  const display = $derived(Math.round(value));

  // 首尾色標落在半顆滑塊的位置，滑塊中心底下的顏色才會剛好是它代表的值
  const track = $derived.by(() => {
    const direction = interpolation ? `to right ${interpolation}` : "to right";
    const first = `${stops[0]} var(--cap)`;
    const last = `${stops[stops.length - 1]} calc(100% - var(--cap))`;
    return `linear-gradient(${[direction, first, ...stops.slice(1, -1), last].join(", ")})`;
  });

  function valueAt(clientX: number) {
    if (!railEl) return value;
    const rect = railEl.getBoundingClientRect();
    return Math.round(Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) * max);
  }

  function handlePointerDown(e: PointerEvent) {
    if (e.button !== 0) return;
    // 捕捉指標：拖出軌道、拖出面板都持續跟手
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    value = valueAt(e.clientX);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
    dragging = true;
    value = valueAt(e.clientX);
  }

  function handlePointerUp() {
    dragging = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    const step = e.shiftKey ? 10 : 1;
    const next = (() => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          return value + step;
        case "ArrowLeft":
        case "ArrowDown":
          return value - step;
        case "PageUp":
          return value + 10;
        case "PageDown":
          return value - 10;
        case "Home":
          return 0;
        case "End":
          return max;
      }
    })();

    if (next === undefined) return;
    e.preventDefault();
    value = Math.min(Math.max(Math.round(next), 0), max);
  }
</script>

<div class="channel">
  <span class="label" aria-hidden="true">{label}</span>

  <div
    class="slider"
    class:dragging
    role="slider"
    tabindex="0"
    aria-label={name}
    aria-valuemin={0}
    aria-valuemax={max}
    aria-valuenow={display}
    aria-valuetext="{display}{unit}"
    style:--track={track}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerUp}
    onkeydown={handleKeydown}
  >
    <div class="rail" bind:this={railEl}>
      <span class="thumb" style:left="{position.current * 100}%" style:background-color={color}></span>
    </div>
  </div>

  <span class="value">{display}{unit}</span>
</div>

<style>
  .channel {
    display: grid;
    grid-template-columns: 0.75rem minmax(0, 1fr) 2.25rem;
    align-items: center;
    gap: 0.5rem;
  }

  .label,
  .value {
    font: var(--font-caption);
    font-family: var(--font-family-mono);
    color: var(--color-text-muted);
  }

  .value {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  /* 可點擊的範圍比看得到的軌道高，不必瞄準那條細線 */
  .slider {
    --cap: 0.5rem;

    position: relative;
    display: flex;
    align-items: center;
    height: 1.5rem;
    padding: 0 var(--cap);
    border-radius: var(--radius-pill);
    touch-action: none;
    cursor: pointer;

    /* 看得到的軌道佔滿整個寬度，色標已經內縮到滑塊中心能走到的範圍 */
    &::before {
      content: "";
      position: absolute;
      inset: 0.4375rem 0;
      border-radius: var(--radius-pill);
      background: var(--track);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
    }
  }

  /* 只是滑塊中心的活動範圍，左右各內縮半顆滑塊 */
  .rail {
    position: relative;
    flex: 1;
    height: 100%;
  }

  .thumb {
    position: absolute;
    top: 50%;
    width: 1rem;
    height: 1rem;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.25),
      var(--shadow-sm);
    pointer-events: none;
    translate: -50% -50%;
    transition: scale 0.15s var(--ease);
  }

  .slider.dragging .thumb,
  .slider:active .thumb {
    scale: 1.2;
  }
</style>
