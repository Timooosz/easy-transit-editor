<script lang="ts">
    import DeleteIcon from "../icons/DeleteIcon.svelte";
    import DrawIcon from "../icons/DrawIcon.svelte";
    import EditIcon from "../icons/EditIcon.svelte";
    import ViewIcon from "../icons/ViewIcon.svelte";
    import SunIcon from "./SunIcon.svelte";
    import MoonIcon from "./MoonIcon.svelte";

    let { selected, size, color } = $props();

    const iconMap = {
        "Delete": DeleteIcon,
        "Draw": DrawIcon,
        "Edit": EditIcon,
        "View": ViewIcon,
        "Sun": SunIcon,
        "Moon": MoonIcon
    };

    const Component = $derived(iconMap[selected]);
</script>

<Component size={size} color={color} />