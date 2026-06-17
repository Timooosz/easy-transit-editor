<script lang="ts">
    import { position, gridSettings, transitData, action } from "../shared/shared.svelte";
    import { lineIntersects, toPixels, halfOpacity } from "../lib/eteMath";
</script>

<svg class="absolute inset-0 w-full h-full" style:pointer-events="none">
    {#each transitData.lines.sort((a, b) => a.layer - b.layer) as line}
        {#if (action.action == "Delete" && position.onGrid && lineIntersects(line, position.x, position.y))}
            <g fill="none" stroke={halfOpacity(line.color)} stroke-width="{line.width}" stroke-linecap="round">
                <path d="M {toPixels(line.from.x)} {toPixels(line.from.y)} L {toPixels(line.to.x)} {toPixels(line.to.y)}" />
            </g>
        {:else}
            <g fill="none" stroke={line.color} stroke-width="{line.width}" stroke-linecap="round">
                <path d="M {toPixels(line.from.x)} {toPixels(line.from.y)} L {toPixels(line.to.x)} {toPixels(line.to.y)}" />
            </g>
        {/if}
    {/each}

    {#each transitData.stations as station}
        <circle r="10" cx="{toPixels(station.x)}" cy="{toPixels(station.y)}" fill="white" stroke="black" stroke-width="2" />
    {/each}
</svg>