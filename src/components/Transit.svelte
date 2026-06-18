<script lang="ts">
    import { position, transitData, action, drawQueue } from "../shared/shared.svelte";
    import { lineIntersects, toPixels, halfOpacity } from "../lib/eteMath";
    import type { line } from "../types/types";

    const isHalfOpacity = (line: line) => {
        return (line.drawPreview && drawQueue.secondInput) ||
               ( action.action == "Delete" && position.onGrid && lineIntersects(line, position.x, position.y));
    }

    const linesToDraw = $derived((
        transitData.previewLine === null || !drawQueue.secondInput
        ? [...transitData.lines]
        : [...transitData.lines, transitData.previewLine]
    ).sort((a, b) => a.layer - b.layer))

    let textElements: (SVGTextElement | undefined)[] = [];

    const updateBBox = (index: number, element: SVGTextElement | null) => {
        if (element) {
            const bbox = element.getBBox();

            transitData.textFields[index].bgBasePos = { x: bbox.x, y: bbox.y };
            transitData.textFields[index].bgBaseSize = { x: bbox.width, y: bbox.height };
        }
    }

    $effect(() => {
        transitData.textFields.forEach((_, index) => {
            if (textElements[index]) {
                updateBBox(index, textElements[index]);
            }
        });
    });
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

    {#each transitData.textFields as textField, index}

        {#if textField.bg}
            <rect width="{textField.bgBaseSize.x + 2 * textField.bgWidth}" height="{textField.bgBaseSize.y + 2 * textField.bgHeight}" x="{textField.bgBasePos.x - textField.bgWidth}" y="{textField.bgBasePos.y - textField.bgHeight}" fill="{textField.bgColor}" rx="{textField.bgBaseSize.x * textField.bgRoundness.x / 200}" ry="{textField.bgBaseSize.y * textField.bgRoundness.y / 200}" />
        {/if}

        <text bind:this={textElements[index]} x="{toPixels(textField.x)}" y="{toPixels(textField.y)}" fill="white" font-size="20" font-family="calibri" dominant-baseline="middle" text-anchor={textField.alignment}>
            {@html textField.text}
        </text>
    {/each}
</svg>