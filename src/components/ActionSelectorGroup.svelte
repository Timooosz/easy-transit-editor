<script lang="ts">
    import ActionSelector from "./ActionSelector.svelte";


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
    ]
</script>

<div class="flex flex-row justify-evenly my-4">
    {#each actionSelectors as actionSelector}
        <ActionSelector text={actionSelector.text} icon={actionSelector.icon} />
    {/each}
</div>