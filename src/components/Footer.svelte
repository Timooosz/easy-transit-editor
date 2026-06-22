<script lang="ts">
    import { getCurrentTheme } from '../lib/themes.svelte';
    import { position, drawQueue, measurements } from '../shared/shared.svelte';

    let element: HTMLElement;
    $effect(() => {
        if (element) {
            const rect = $derived(element.getBoundingClientRect());
            measurements.fHeight = rect.height;
        }
    })
</script>

<div bind:this={element} class="{getCurrentTheme().bg_main} flex flex-row py-1">
    {#if position.onGrid}
        <p class="{getCurrentTheme().text_default}">x: {position.x}, y: {position.y}</p>
    {:else}
        <p class="{getCurrentTheme().text_default}">Outside of grid</p>
    {/if}

    {#if drawQueue.secondInput}
        <p class="{getCurrentTheme().text_default} ml-1">| Drawing from x: {drawQueue.pointQueue.x}, y: {drawQueue.pointQueue.y}</p>
    {/if}
</div>