<script lang="ts">
    import { position, transitData, action, drawQueue } from "../shared/shared.svelte";
    import { lineIntersects, toPixels, halfOpacity } from "../lib/eteMath";
    import type { line } from "../types/types";
  import { parseText } from "../lib/textParser";

    const isHalfOpacity = (line: line) => {
        return (line.drawPreview && drawQueue.secondInput) ||
               ( action.action == "Delete" && position.onGrid && lineIntersects(line, position.x, position.y));
    }

    const linesToDraw = $derived((
        transitData.previewLine === null || !drawQueue.secondInput
        ? [...transitData.lines]
        : [...transitData.lines, transitData.previewLine]
    ).sort((a, b) => a.layer - b.layer))
</script>

<svg class="absolute inset-0 w-full h-full" style:pointer-events="none">
    {#each linesToDraw as line}
        {#if isHalfOpacity(line)}
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
        <rect
            width="{toPixels(station.width - 1, false) + station.thickness}" height="{toPixels(station.height - 1, false) + station.thickness}"
            x="{toPixels(station.x) - station.thickness / 2}" y="{toPixels(station.y) - station.thickness / 2}"
            rx="{station.thickness * station.roundness / 200}" ry="{station.thickness * station.roundness / 200}"
            fill="white" stroke="black"
            stroke-width="{station.borderThickness}"
        />
    {/each}

    {#each transitData.textFields as textField}
        <text x="{toPixels(textField.x)}" y="{toPixels(textField.y)}" fill="white" font-size="20" font-family="roboto" dominant-baseline="middle">
            {@html parseText(textField.text, toPixels(textField.x))}
        </text>
    {/each}
</svg>