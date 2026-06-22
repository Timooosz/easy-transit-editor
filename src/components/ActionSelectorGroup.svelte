<script lang="ts">
    import ActionSelector from "./ActionSelector.svelte";
    import { action } from "../shared/shared.svelte";
    import { getCurrentTheme } from "../lib/themes.svelte";


    const actionSelectors = ["View", "Draw", "Edit", "Delete"];

    const tooltips = {
        "View": "Take a look at your beautiful creation!",
        "Draw": "Click on a cell to start drawing a line. Click on another to draw the line. Click on the same cell to draw a station/text/icon.",
        "Edit": "Click on a line to copy its color. Click on the origin of a station/text to edit it.",
        "Delete": "Click on an element to delete it. Stations and texts are deleted on their origin position."
    } as const;
</script>

<div class="mx-2">
    <div class="flex flex-row justify-evenly my-4">
        {#each actionSelectors as actionSelector}
            <ActionSelector text={actionSelector} />
        {/each}
    </div>
    <p class="wrap-break-words max-w-sm {getCurrentTheme().text_secondary}">{tooltips[action.action]}</p>
</div>