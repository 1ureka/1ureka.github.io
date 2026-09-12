<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import CircularProgress from "$lib/components/display/CircularProgress.svelte";

  type BasicProps = {
    variant?: "primary" | "outlined" | "ghost" | "destructive";
    status?: "default" | "pending" | "disabled";
    /** icon 為正方形的純圖示按鈕，text 為帶水平內距的一般按鈕；兩者同高 */
    padding?: "icon" | "text";
    children?: Snippet;
  };

  export type ButtonProps = BasicProps & HTMLButtonAttributes;

  export type LinkProps = BasicProps & HTMLAnchorAttributes & { href: string };

  type Props = { button?: ButtonProps; link?: LinkProps };

  const props: Props = $props();

  const getSpinnerColor = (variant: BasicProps["variant"]) => {
    if (variant === "destructive") return "var(--color-error)";
    if (variant === "primary") return "var(--color-accent-text)";
    return "var(--color-text)";
  };

  const getClass = ({ variant = "outlined", padding = "text", status }: BasicProps) => ({
    btn: true,
    pending: status === "pending",
    [variant]: true,
    [`p-${padding}`]: true,
  });
</script>

{#snippet button({ type, variant, status, padding, children, ...rest }: ButtonProps)}
  {@const disabled = status === "disabled" || status === "pending"}
  <button type={type ?? "button"} {disabled} class={getClass({ variant, padding, status })} {...rest}>
    {@render children?.()}
    {#if status === "pending"}
      <span class="spinner">
        <CircularProgress color={getSpinnerColor(variant)} size={"1.125rem"} />
      </span>
    {/if}
  </button>
{/snippet}

{#snippet link({ href, variant, status, padding, children, onclick, ...rest }: LinkProps)}
  {@const disabled = status === "disabled" || status === "pending"}
  {@const handleClick = disabled ? (e: MouseEvent) => e.preventDefault() : onclick}
  <a {href} aria-disabled={disabled} onclick={handleClick} class={getClass({ variant, padding, status })} {...rest}>
    {@render children?.()}
    {#if status === "pending"}
      <span class="spinner">
        <CircularProgress color={getSpinnerColor(variant)} size={"1.125rem"} />
      </span>
    {/if}
  </a>
{/snippet}

{#if props.button}
  {@render button(props.button)}
{:else if props.link}
  {@render link(props.link)}
{/if}

<style>
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4375rem;
    font: var(--font-button);
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    user-select: none;

    /* 確保每種按鈕無論是否有可見邊框都是同樣高寬 */
    border: var(--border-style);
    will-change: transform;
    transition:
      transform 0.12s var(--ease),
      background-color 0.18s var(--ease),
      border-color 0.18s var(--ease),
      color 0.18s var(--ease),
      opacity 0.18s var(--ease);

    &:active {
      transform: scale(0.97);
    }

    &:disabled,
    &[aria-disabled="true"] {
      opacity: 0.55;
      pointer-events: none;
    }

    &.pending {
      color: transparent !important;
      & > *:not(.spinner) {
        visibility: hidden;
      }
    }
  }

  .spinner {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  /*
   * --- 尺寸 ---
   * 全站只有一種按鈕高度，且與 TextInput、Select 同高。
   * 垂直方向一律靠 height 加置中，padding 只給水平，換字級時高度才不會跟著跑。
   */

  .btn.p-icon {
    width: var(--control-height);
    height: var(--control-height);
    border-radius: var(--radius-sm);
  }

  .btn.p-text {
    height: var(--control-height);
    padding: 0 0.75rem;
    border-radius: var(--radius-sm);
  }

  /* --- 外觀 --- */

  .btn.primary {
    color: var(--color-accent-text);
    background-color: var(--color-accent);
    border-color: var(--color-accent);

    &:hover {
      background-color: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
    }
  }

  .btn.outlined {
    color: var(--color-text);
    background-color: var(--color-bg-card);
    border-color: var(--color-border);

    &:hover {
      background-color: var(--color-bg-subtle);
      border-color: var(--color-border);
    }
  }

  .btn.ghost {
    color: var(--color-text-muted);
    background-color: transparent;
    border-color: transparent;

    &:hover {
      color: var(--color-text);
      background-color: var(--color-bg-subtle);
    }
  }

  .btn.destructive {
    color: var(--color-error);
    background-color: color-mix(in srgb, var(--color-error) 8%, transparent);
    border-color: color-mix(in srgb, var(--color-error) 35%, transparent);

    &:hover {
      background-color: color-mix(in srgb, var(--color-error) 16%, transparent);
      border-color: color-mix(in srgb, var(--color-error) 55%, transparent);
    }
  }
</style>
