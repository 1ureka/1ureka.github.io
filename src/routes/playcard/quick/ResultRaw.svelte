<script lang="ts">
  import { IconCopy } from "#lib/icons/index.ts";
  import Button from "#lib/components/actions/Button.svelte";
  import { copyText } from "#lib/utils/clipboard.ts";
  import { addToast } from "#lib/components/floating/toast-events.ts";
  import { formatError } from "#lib/utils/shared.ts";
  import type { VideoCard } from "#lib/oembed/index.ts";

  let { card }: { card: VideoCard } = $props();

  type TokenKind = "key" | "string" | "number" | "literal" | "plain";

  /** 字串（含後接的冒號）、布林、null、數字；其餘皆為結構符號與空白 */
  const TOKEN =
    /("(?:\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"\s*:?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

  /**
   * 切成帶標記的片段再交給模板逐段渲染。
   * 刻意不走「拼一段 HTML 再 {@html}」，那會把外部服務的回應變成可執行的標記。
   */
  function tokenize(json: string): { text: string; kind: TokenKind }[] {
    const tokens: { text: string; kind: TokenKind }[] = [];
    let cursor = 0;

    for (const match of json.matchAll(TOKEN)) {
      const start = match.index;
      if (start > cursor) tokens.push({ text: json.slice(cursor, start), kind: "plain" });

      const text = match[0];
      let kind: TokenKind = "number";
      if (text.startsWith('"')) kind = text.trimEnd().endsWith(":") ? "key" : "string";
      else if (text === "true" || text === "false" || text === "null") kind = "literal";

      tokens.push({ text, kind });
      cursor = start + text.length;
    }

    if (cursor < json.length) tokens.push({ text: json.slice(cursor), kind: "plain" });
    return tokens;
  }

  const json = $derived(JSON.stringify(card.raw, null, 2));
  const tokens = $derived(tokenize(json));

  async function handleCopy() {
    try {
      await copyText(json);
      addToast({ message: "已複製 JSON", variant: "success" });
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  }
</script>

<pre>{#each tokens as token, i (i)}<span class={token.kind}>{token.text}</span>{/each}</pre>

<div class="toolbar">
  <Button variant="outlined" onclick={handleCopy}>
    <IconCopy size={14} />
    複製 JSON
  </Button>
</div>

<style>
  pre {
    max-height: 21.25rem;
    padding: 1rem;
    font: var(--font-mono);
    line-height: 1.75;
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-radius: var(--radius-control);
    overflow: auto;
  }

  .key {
    color: var(--color-accent-hover);
  }

  .string {
    color: var(--color-success);
  }

  .number {
    color: var(--color-info);
  }

  .literal {
    color: var(--color-text-muted);
    font-style: italic;
  }

  .plain {
    color: var(--color-text-muted);
  }

  .toolbar {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.625rem;
  }
</style>
