<script lang="ts">
    import { gridSettings, transitData } from "../shared/shared.svelte";
    import { toPixels } from "../lib/eteMath";
</script>

<svg class="absolute inset-0 w-full h-full" style:pointer-events="none">
    {#each transitData.lines.sort((a, b) => a.layer - b.layer) as line}
        <g fill="none" stroke={line.color} stroke-width="{line.width}" stroke-linecap="round">
            <path d="M {toPixels(line.from.x)} {toPixels(line.from.y)} L {toPixels(line.to.x)} {toPixels(line.to.y)}" />
        </g>
    {/each}

    {#each transitData.stations as station}
        <circle r="10" cx="{toPixels(station.x)}" cy="{toPixels(station.y)}" fill="white" stroke="black" stroke-width="2" />
    {/each}
</svg>