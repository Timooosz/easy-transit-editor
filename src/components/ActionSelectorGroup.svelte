<script lang="ts">
    import ActionSelector from "./ActionSelector.svelte";
    import { action } from "../shared/shared.svelte";


    type t_actionSelector = {
        text: string,
        icon: string
    }

    const actionSelectors: t_actionSelector[] = [
        {
            text: "View",
            icon: "view-simple-815"
        },
        {
            text: "Draw",
            icon: "pen-1319"
        },
        {
            text: "Edit",
            icon: "edit-1479"
        },
        {
            text: "Delete",
            icon: "delete-1487"
        }
    ];

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
            <ActionSelector text={actionSelector.text} icon={actionSelector.icon} />
        {/each}
    </div>
    <p class="wrap-break-words max-w-sm text-taupe-200/80">{tooltips[action.action]}</p>
</div>