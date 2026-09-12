<script lang="ts">
  /**
   * 第二個工具的位置。
   *
   * 之後會長成與 Playcard 同構的樣子：自己的 `logic/` controller、自己的 `Tabs`
   * （只有兩個分頁，沒有批次），主角是任意圖片連結或投放進來的圖片。
   * 殼層已經準備好它需要的一切——
   * 工具切換在 `logic/tool.svelte.ts`，全域投放在 `+page.svelte` 依目前工具分派，
   * 版面元件（Tabs / PanelHead / EmptyState）都在 `$lib/components/display/`。
   */
  import { IconEraser } from "$lib/icons";
  import PanelHead from "$lib/components/display/PanelHead.svelte";
  import EmptyState from "$lib/components/display/EmptyState.svelte";
</script>

<div class="tabbar">
  <!-- <Tabs items={ITEMS} current={tabs.current} label="功能分頁" onselect={tabs.handleSelect} /> -->
</div>

<div class="panel">
  <PanelHead
    size="hero"
    eyebrow="第二個工具"
    title="Sanitizer"
    description="這個工具還沒有實作，名稱也還是暫定的。它會處理任意圖片連結或直接投放進來的圖片。"
  />

  <div class="body">
    <EmptyState>
      {#snippet icon()}
        <IconEraser size={36} />
      {/snippet}
      尚未實作。左上角的切換鈕可以隨時回到 Playcard。
    </EmptyState>
  </div>
</div>

<style>
  .panel {
    padding: 1.5rem;
    padding-bottom: 3.5rem;
    margin-top: auto;
    margin-bottom: auto;
  }

  .body {
    max-width: 51.25rem;
    margin: 0 auto;
  }
</style>
