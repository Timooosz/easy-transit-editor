<script lang="ts">
    import { action } from "../shared/shared.svelte";

    let { text, icon } = $props();

    let selected = $derived( action.action === text);
</script>

<div class="flex flex-col justify-center items-center {selected ? "bg-taupe-600" : "bg-taupe-700"} hover:bg-taupe-600 py-2 w-16" on:click={() => {
    if (!selected) {
        action.action = text;
    }
}}>
    <p>{text}</p>
    <img src="/{icon}-svgrepo-com.svg" class="w-8 h-8">
</div>