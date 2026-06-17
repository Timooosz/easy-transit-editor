<script lang="ts">
    import { contextMenuSettings, drawQueue } from "../shared/shared.svelte";
    import { addStation } from "../lib/transit.svelte";
    import { toPixels } from "../lib/eteMath";
</script>

{#if contextMenuSettings.show}
    <div
        class="absolute bg-taupe-800 z-50"
        style:left="{contextMenuSettings.x}px"
        style:top="{contextMenuSettings.y}px"
    >
        <ul class="py-1">
            <li class="px-4 py-2 text-taupe-200 hover:bg-taupe-700 cursor-pointer" on:click={() => {
                    addStation({x: drawQueue.pointQueue.x, y: drawQueue.pointQueue.y});
                    contextMenuSettings.show = false;
                }
            }>New Station</li>
            <li class="px-4 py-2 text-taupe-200 hover:bg-taupe-700 cursor-pointer" on:click={() => contextMenuSettings.show = false}>Cancel</li>
        </ul>
    </div>
    <div 
        class="fixed inset-0"
        on:click={() => contextMenuSettings.show = false}
    ></div>
{/if}