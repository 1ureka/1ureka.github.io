<script lang="ts">
  interface Props {
    /** 小標，會顯示為一個帶點的大寫標籤 */
    eyebrow: string;
    title: string;
    description: string;
    /** 首要分頁用 hero 尺寸，其餘用一般尺寸 */
    size?: "hero" | "default";
  }

  let { eyebrow, title, description, size = "default" }: Props = $props();
</script>

<div class="head">
  <span class="eyebrow">{eyebrow}</span>
  <h2 class:hero={size === "hero"}>{title}</h2>
  <p>{description}</p>
</div>

<style>
  .head {
    max-width: 40rem;
    margin: 0 auto 1.875rem;
    text-align: center;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 0.875rem;
    font: var(--font-caption);
    font-weight: 600;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.07em;

    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--color-accent);
    }
  }

  h2 {
    font: var(--font-title1);
    margin-bottom: 0.875rem;
    text-wrap: balance;
  }

  h2.hero {
    font: var(--font-hero);
  }

  p {
    max-width: 32.5rem;
    margin: 0 auto;
    font: var(--font-body1);
    color: var(--color-text-muted);
    text-wrap: balance;
  }
</style>
