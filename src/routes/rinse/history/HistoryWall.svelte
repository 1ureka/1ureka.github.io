<script lang="ts">
  import { Virtualizer } from "#lib/utils/virtualize.svelte.ts";

  import { getRinseHistoryContext } from "../logic/history.svelte";
  import type { RinseRecord } from "../logic/store";
  import HistoryCard from "./HistoryCard.svelte";

  let { onsaveas }: { onsaveas: (record: RinseRecord) => void } = $props();

  const history = getRinseHistoryContext();

  /** 依牆的寬度決定欄數的門檻 */
  const BREAKPOINTS = [
    { width: 900, cols: 5 },
    { width: 680, cols: 4 },
    { width: 440, cols: 3 },
    { width: 0, cols: 2 },
  ];

  /** 卡片的高寬比上下限；極端長條的圖照實排會在牆上拉出一整條，裁成可接受的比例再顯示 */
  const MIN_RATIO = 0.5;
  const MAX_RATIO = 1.8;

  const GAP = 10;

  let width = $state(0);

  const columns = $derived(BREAKPOINTS.find((b) => width >= b.width)?.cols ?? 2);

  const items = $derived(
    history.visible.map((record) => {
      const ratio = record.width > 0 ? record.height / record.width : 1;
      return { id: record.id, width: 1, height: Math.min(MAX_RATIO, Math.max(MIN_RATIO, ratio)), record };
    }),
  );

  const masonry = Virtualizer.masonry({
    get items() {
      return items;
    },
    get columns() {
      return columns;
    },
    get gap() {
      return GAP;
    },
    get overscan() {
      return 600;
    },
  });
</script>

<ul
  aria-label="沖洗歷史"
  bind:this={masonry.contentEl}
  bind:clientWidth={width}
  style:height="{masonry.contentHeight}px"
  style:margin="-{GAP / 2}px"
>
  {#each masonry.visibleItems as item (item.id)}
    <li style={item.style}>
      <HistoryCard record={item.record} {onsaveas} />
    </li>
  {/each}
</ul>

<style>
  ul {
    position: relative;
  }

  li {
    display: block;
  }
</style>
