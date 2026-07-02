<script lang="ts">
    import Icon from "../icons/_Icons.svelte";
    import { getCurrentTheme } from "../lib/themes.svelte";

    const { text, type, icon, onclick } = $props();

    const colors = $derived([
        getCurrentTheme().btn_default,
        getCurrentTheme().btn_contrast,
        getCurrentTheme().btn_danger
    ])
</script>

<div class="flex flex-row {colors[type]} m-2 p-2 items-center justify-center rounded-xl cursor-pointer" onclick={onclick}>
    <Icon selected={icon} size={20} color={getCurrentTheme().svg_icon} />
    <p class="text-lg font-bold ml-2 {getCurrentTheme().text_default}">{text}</p>
</div>