<script lang="ts">
  import "$lib/styles/app.css";
  import favicon from "$lib/assets/favicon.svg";
  import type { Snippet } from "svelte";

  import Tooltip from "$lib/components/floating/Tooltip.svelte";
  import ToastStage from "$lib/components/floating/ToastStage.svelte";
  import ToastList from "$lib/components/floating/ToastList.svelte";

  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<Tooltip />
<ToastStage />
<ToastList />
