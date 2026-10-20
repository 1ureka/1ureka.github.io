<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Placement, ReferenceElement, OffsetOptions } from "@floating-ui/dom";
  import { Popover, popoverIntro, popoverOutro } from "#lib/components/floating/popover.core.svelte.ts";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** 開關狀態 */
    open: boolean;
    /** 參照元素（定位錨點），可為 VirtualElement */
    reference: ReferenceElement | undefined;
    /** 內容 */
    children: Snippet;
    /** 偏好位置，預設 'bottom-start' */
    placement?: Placement;
    /** 是否匹配參照元素寬度，預設 false */
    matchWidth?: boolean;
    /** 離參照元素的距離，預設 4px；也可以是 floating-ui 的 offset 設定 */
    offset?: OffsetOptions;
    /** 是否顯示箭頭（Astroid 形狀），預設 false */
    arrow?: boolean;
    /** 箭頭尺寸（px） */
    arrowSize?: number;
    /** 箭頭顏色，預設 currentColor */
    arrowColor?: string;
    /** ? */
    crossfadeKey?: string;
  }

  const fallbackId = $props.id();

  let {
    open,
    reference,
    children,
    placement = "bottom-start",
    matchWidth = false,
    offset = 4,
    arrow = false,
    arrowSize = 20,
    arrowColor = "currentColor",
    crossfadeKey = fallbackId,
    ...rest
  }: Props = $props();

  const ui = new Popover({
    get open() {
      return open;
    },
    get reference() {
      return reference;
    },
    get placement() {
      return placement;
    },
    get matchWidth() {
      return matchWidth;
    },
    get offset() {
      return offset;
    },
    get arrow() {
      return arrow;
    },
  });
</script>

<div
  bind:this={ui.popoverEl}
  popover="manual"
  style:left="{ui.x.current}px"
  style:top="{ui.y.current}px"
  style:width={matchWidth ? `${ui.width}px` : undefined}
  role="presentation"
>
  {#if open}
    <div
      in:popoverIntro={{ key: crossfadeKey }}
      out:popoverOutro={{ key: crossfadeKey }}
      onoutroend={ui.handleOutroEnd}
      {...rest}
    >
      {@render children()}
      {#if arrow}
        <svg
          bind:this={ui.arrowEl}
          viewBox="0 0 16 16"
          width={arrowSize}
          height={arrowSize}
          aria-hidden="true"
          style:left={ui.arrowX != null ? `${ui.arrowX}px` : undefined}
          style:top={ui.arrowY != null ? `${ui.arrowY}px` : undefined}
          style:--arrow-size="{arrowSize}px"
          data-side={ui.arrowSide}
        >
          <!-- Astroid -->
          <path d="M 8 0 Q 8 8 16 8 Q 8 8 8 16 Q 8 8 0 8 Q 8 8 8 0 Z" fill={arrowColor} />
        </svg>
      {/if}
    </div>
  {/if}
</div>

<style>
  div[popover="manual"] {
    position: fixed;
    border: none;
    outline: none;
    background: transparent;
    margin: 0;
    padding: 0;
    overflow: visible;
    /* 外層只是定位用的透明殼，命中判定交給內容自己決定 */
    pointer-events: none;
  }

  div[popover="manual"] > div {
    position: relative;
    overflow: visible;
    pointer-events: auto;
  }

  div[popover="manual"] > div > svg {
    position: absolute;
    pointer-events: none;

    &[data-side="top"] {
      top: calc(var(--arrow-size) * -0.5);
      transform: scaleX(1.5);
    }
    &[data-side="bottom"] {
      bottom: calc(var(--arrow-size) * -0.5);
      transform: scaleX(1.5);
    }
    &[data-side="left"] {
      left: calc(var(--arrow-size) * -0.5);
      transform: scaleY(1.35) translateX(10%);
    }
    &[data-side="right"] {
      right: calc(var(--arrow-size) * -0.5);
      transform: scaleY(1.35) translateX(-10%);
    }
  }
</style>
