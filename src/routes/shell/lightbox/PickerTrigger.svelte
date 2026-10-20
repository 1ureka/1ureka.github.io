<script lang="ts">
  import { scale } from "svelte/transition";
  import { IconColorPicker } from "#lib/icons";
  import Button from "#lib/components/actions/Button.svelte";
  import { tooltip } from "#lib/components/floating/tooltip.core.svelte.ts";
  import { popoverIntro } from "#lib/components/floating/popover.core.svelte.ts";
  import { PICKER_KEY, type Picker } from "./picker.svelte";

  let { picker }: { picker: Picker } = $props();

  const picking = $derived(picker.mode === "picking");

  const hint = $derived.by(() => {
    if (picker.source === "unavailable") return "此圖片來源不允許取色";
    return picking ? "結束取色" : "取色";
  });
</script>

<!-- 外框常駐，按鈕收起成面板時它仍是面板的定位錨點 -->
<div class="corner" bind:this={picker.cornerEl}>
  {#if picker.mode !== "picked"}
    <!--
      進場和面板共用 crossfade key，面板收起時就是縮回這顆按鈕；
      離場則是放大鏡在變形成面板，這裡只需要讓出位置。
      停用的按鈕收不到滑鼠事件，tooltip 掛在外層才說得出為什麼不能取色。
    -->
    <div
      in:popoverIntro={{ key: PICKER_KEY }}
      out:scale={{ duration: 150, start: 0.8 }}
      {@attach tooltip({ content: hint, placement: "top" })}
    >
      <Button
        variant={picking ? "primary" : "outlined"}
        padding="icon"
        status={picker.source === "ready" ? "default" : "disabled"}
        aria-pressed={picking}
        onclick={picker.handleToggle}
      >
        <IconColorPicker size={17} />
        <span class="sr-only">{hint}</span>
      </Button>
    </div>
  {/if}
</div>

<style>
  .corner {
    position: absolute;
    right: 1.25rem;
    bottom: 1.25rem;
    width: var(--control-height);
    height: var(--control-height);
  }
</style>
