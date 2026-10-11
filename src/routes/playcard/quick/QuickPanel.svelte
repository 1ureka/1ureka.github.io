<script lang="ts">
  import { fly } from "svelte/transition";

  import PanelHead from "#lib/components/display/PanelHead.svelte";
  import { getLookupContext } from "../logic/lookup.svelte";
  import LookupForm from "./LookupForm.svelte";
  import ResultCard from "./ResultCard.svelte";

  const lookup = getLookupContext();
</script>

<PanelHead
  size="hero"
  eyebrow="Youtube oEmbed · 公開端點"
  title="把 YouTube 連結變成資訊卡"
  description="貼上網址，透過 YouTube 官方 oEmbed 服務讀取標題、頻道與內嵌程式碼。"
/>

<LookupForm />

{#if lookup.result !== null}
  <div class="result" in:fly={{ y: 12, duration: 260, delay: 60 }}>
    <ResultCard card={lookup.result} />
  </div>
{/if}

<style>
  .result {
    max-width: 47.5rem;
    margin: 2.25rem auto 0;
  }
</style>
