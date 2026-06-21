<script lang="ts">
    import DeleteIcon from "../icons/DeleteIcon.svelte";
    import DrawIcon from "../icons/DrawIcon.svelte";
    import EditIcon from "../icons/EditIcon.svelte";
    import ViewIcon from "../icons/ViewIcon.svelte";

    let { selected, size, color } = $props();

    const iconMap = {
        "Delete": DeleteIcon,
        "Draw": DrawIcon,
        "Edit": EditIcon,
        "View": ViewIcon,
    };

    const Component = $derived(iconMap[selected]);
</script>

<Component size={size} color={color} />