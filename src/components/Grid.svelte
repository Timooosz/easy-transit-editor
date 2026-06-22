<script lang="ts">
    import Cell from './Cell.svelte'
    import { gridSettings } from '../shared/shared.svelte'
    import { getCurrentTheme } from '../lib/themes.svelte';
</script>

<div
    class="w-fit {getCurrentTheme().bg_grid}"
    style:display="grid"
    style:grid-template-columns="repeat({gridSettings.width}, auto)"
>
    {#each { length: gridSettings.height }, i }
        {#each { length: gridSettings.width }, j}
            <Cell size={gridSettings.size} x={j} y={i} />
        {/each}
    {/each}
</div>