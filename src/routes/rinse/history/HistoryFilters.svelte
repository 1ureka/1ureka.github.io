<script lang="ts">
  import { IconSearch, IconX } from "$lib/icons";
  import Button from "$lib/components/actions/Button.svelte";
  import TextInput from "$lib/components/inputs/TextInput.svelte";
  import Select from "$lib/components/inputs/Select.svelte";

  import { SOURCE_LABELS } from "../logic/rinse.svelte";
  import { getRinseHistoryContext, type SourceFilter } from "../logic/history.svelte";

  const history = getRinseHistoryContext();

  const SOURCES: Record<SourceFilter, string> = { all: "全部來源", ...SOURCE_LABELS };
  const SOURCE_KEYS = Object.keys(SOURCES);
</script>

<div class="filters">
  <!-- 版面（撐滿剩餘寬度）只能交給元件的 root，scoped 樣式跨不過元件邊界 -->
  <TextInput
    label="搜尋檔名"
    labelHidden
    placeholder="搜尋檔名…"
    value={history.search}
    oninput={(e) => history.handleSearch(e.currentTarget.value)}
    spellcheck="false"
    autocomplete="off"
    rootProps={{ style: "flex: 1; min-width: 12rem;" }}
  >
    {#snippet adornmentLeft()}
      <span class="adornment"><IconSearch size={16} /></span>
    {/snippet}
  </TextInput>

  <label class="sr-only" for="rinse-history-source">來源</label>
  <Select
    id="rinse-history-source"
    value={history.source}
    options={SOURCE_KEYS}
    matchWidth={false}
    onchange={history.handleSourceChange}
  >
    {#snippet option(key: string)}
      {SOURCES[key as SourceFilter]}
    {/snippet}
  </Select>

  <div class="dates">
    <TextInput
      label="起始日期"
      labelHidden
      type="date"
      value={history.from}
      max={history.to || undefined}
      oninput={(e) => history.handleFromChange(e.currentTarget.value)}
    >
      {#snippet adornmentLeft()}
        <span class="adornment text">從</span>
      {/snippet}
    </TextInput>

    <TextInput
      label="結束日期"
      labelHidden
      type="date"
      value={history.to}
      min={history.from || undefined}
      oninput={(e) => history.handleToChange(e.currentTarget.value)}
    >
      {#snippet adornmentLeft()}
        <span class="adornment text">到</span>
      {/snippet}
    </TextInput>
  </div>

  {#if history.filtering}
    <Button variant="ghost" onclick={history.handleResetFilters}>
      <IconX size={14} />
      清除條件
    </Button>
  {/if}
</div>

<style>
  .filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  .dates {
    display: flex;
    gap: 0.5rem;
  }

  .adornment {
    display: flex;
    align-items: center;
    padding-left: 0.65rem;
    color: var(--color-text-muted);

    &.text {
      font: var(--font-button);
    }
  }
</style>
