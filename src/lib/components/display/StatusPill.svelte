<script lang="ts">
  let { status, children }: { status: "ok" | "error" | "pending"; children: import("svelte").Snippet } = $props();
</script>

<span class="pill {status}">
  <span class="dot"></span>
  {@render children()}
</span>

<style>
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 0.3125rem;
    padding: 0.1875rem 0.5625rem;
    font: var(--font-caption);
    font-weight: 700;
    border-radius: var(--radius-pill);
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: currentColor;
  }

  .ok {
    color: var(--color-success);
    background-color: var(--color-success-tint);
  }

  .error {
    color: var(--color-error);
    background-color: var(--color-error-tint);
  }

  .pending {
    color: var(--color-text-muted);
    background-color: var(--color-bg-subtle);
  }
</style>
