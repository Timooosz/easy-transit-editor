<script lang="ts">
    import Icon from "../icons/_Icons.svelte";
    import { action } from "../shared/shared.svelte";

    let {text} = $props();

    let selected = $derived( action.action === text);
</script>

<div class="flex flex-col justify-center items-center {selected ? "bg-taupe-600" : "bg-taupe-700"} hover:bg-taupe-600 py-2 w-16" on:click={() => {
    if (!selected) {
        action.action = text;
    }
}}>
    <p class="mb-2">{text}</p>
    <Icon selected={text} color="#000000" size={30} />
</div>