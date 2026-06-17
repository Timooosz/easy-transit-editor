<script lang="ts">
    import Cell from './Cell.svelte'
    import { gridSettings } from '../shared/shared.svelte'
</script>

<div
    class="w-fit bg-taupe-950"
    style:display="grid"
    style:grid-template-columns="repeat({gridSettings.width}, auto)"
>
    {#each { length: gridSettings.height }, i }
        {#each { length: gridSettings.width }, j}
            <Cell size={gridSettings.size} x={j} y={i} />
        {/each}
    {/each}
</div>