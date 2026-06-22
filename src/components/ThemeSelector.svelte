<script lang="ts">
    import Icon from "../icons/_Icons.svelte";
    import { getCurrentTheme, getDarkMode, toggleTheme } from "../lib/themes.svelte";
</script>

<div onclick={toggleTheme} class="mx-2 my-3">
    {#if getDarkMode()}
        <Icon selected="Moon" color="{getCurrentTheme().svg_icon}" size={30} />
    {:else}
        <Icon selected="Sun" color="{getCurrentTheme().svg_icon}" size={30} />
    {/if}
</div>