<script lang="ts">
    import Icon from "../icons/_Icons.svelte";
    import { getCurrentTheme } from "../lib/themes.svelte";

    const { text, onclick } = $props();
</script>

<div class="flex flex-row bg-red-500 m-2 p-2 items-center justify-center" onclick={onclick}>
    <Icon selected="File" size={20} color={getCurrentTheme().svg_icon} />
    <p class="text-lg font-bold ml-2 {getCurrentTheme().text_default}">{text}</p>
</div>