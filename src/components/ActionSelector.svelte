<script lang="ts">
    import Icon from "../icons/_Icons.svelte";
    import { getCurrentTheme } from "../lib/themes.svelte";
    import { action } from "../shared/shared.svelte";

    let {text} = $props();

    let selected = $derived( action.action === text);
</script>

<div class="flex flex-col justify-center items-center {selected ? getCurrentTheme().btn_default_selected : getCurrentTheme().btn_default} hover:{getCurrentTheme().btn_default_selected} py-2 w-16 cursor-pointer" on:click={() => {
    if (!selected) {
        action.action = text;
    }
}}>
    <p class="mb-2 {getCurrentTheme().text_default}">{text}</p>
    <Icon selected={text} color={getCurrentTheme().svg_icon} size={30} />
</div>