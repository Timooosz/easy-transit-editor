<script lang="ts">
    import { gridSettings, transitData } from "../shared/shared.svelte";

    const toPixels = (x: number) => {
        const remToPx = 16;
        const offset = remToPx * gridSettings.size / 2;
        const conversionRate = remToPx * gridSettings.size;
        return offset + x * conversionRate;
    }
</script>

<svg class="absolute inset-0 w-full h-full" style:pointer-events="none">
    {#each transitData.lines as line}
        <g fill="none" stroke={line.color} stroke-width="{line.width}" stroke-linecap="round">
            <path d="M {toPixels(line.from.x)} {toPixels(line.from.y)} L {toPixels(line.to.x)} {toPixels(line.to.y)}" />
        </g>
    {/each}
</svg>