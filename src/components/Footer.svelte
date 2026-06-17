<script lang="ts">
    import { position, drawQueue } from '../shared/shared.svelte';
</script>

<div class="bg-taupe-800 flex flex-row py-1">
    {#if position.onGrid}
        <p class="text-taupe-200">x: {position.x}, y: {position.y}</p>
    {:else}
        <p class="text-taupe-200">Outside of grid</p>
    {/if}

    {#if drawQueue.secondInput}
        <p class="text-taupe-200 ml-1">| Drawing from x: {drawQueue.pointQueue.x}, y: {drawQueue.pointQueue.y}</p>
    {/if}
</div>