<script lang="ts">
  import type { IconProps } from "#lib/types.ts";
  let { color = "currentColor", size = 24, ...rest }: IconProps = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  {...rest}
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M21 7l-18 0" />
  <path d="M18 10l3 -3l-3 -3" />
  <path d="M6 20l-3 -3l3 -3" />
  <path d="M3 17l18 0" />
</svg>
