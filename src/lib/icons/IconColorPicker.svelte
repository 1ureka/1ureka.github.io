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
  <path d="M11 7l6 6" />
  <path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" />
</svg>
