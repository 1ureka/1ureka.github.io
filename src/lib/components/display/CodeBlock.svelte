<script lang="ts">
  interface Props {
    /** 要呈現的原始文字，一律以純文字呈現，不會被當成標記解析 */
    code: string;
    /** 內容高度上限 */
    maxHeight?: string;
  }

  let { code, maxHeight = "13.75rem" }: Props = $props();
</script>

<pre style:max-height={maxHeight}>{code}</pre>

<style>
  pre {
    padding: 0.875rem 1rem;
    font: var(--font-mono);
    color: var(--color-text-muted);
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-radius: var(--radius-control);
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>
