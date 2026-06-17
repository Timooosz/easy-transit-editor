<script lang="ts">
    import { contextMenuSettings, defaultStationSettings, drawQueue, textPromtSettings } from "../shared/shared.svelte";
    import { addStation } from "../lib/transit.svelte";

    let currentId = 1;
</script>

{#if contextMenuSettings.show}
    <div
        class="absolute bg-taupe-800 z-50"
        style:left="{contextMenuSettings.x}px"
        style:top="{contextMenuSettings.y}px"
    >
        <ul class="py-1">
            <li class="px-4 py-2 text-taupe-200 hover:bg-taupe-700 cursor-pointer" on:click={() => {
                    addStation({id: currentId,
                        x: drawQueue.pointQueue.x, y: drawQueue.pointQueue.y,
                        width: defaultStationSettings.width, height: defaultStationSettings.height,
                        thickness: defaultStationSettings.thickness, borderThickness: defaultStationSettings.borderThickness,
                        roundness: defaultStationSettings.roundness}
                    );
                    currentId++;
                    contextMenuSettings.show = false;
                }
            }>New Station</li>
            <li class="px-4 py-2 text-taupe-200 hover:bg-taupe-700 cursor-pointer" on:click={() => {
                contextMenuSettings.show = false;
                textPromtSettings.text = "";
                textPromtSettings.show = true;
            }}>New Text</li>
            <li class="px-4 py-2 text-taupe-200 hover:bg-taupe-700 cursor-pointer">New Symbol</li>
            <li class="px-4 py-2 text-taupe-200 hover:bg-taupe-700 cursor-pointer" on:click={() => contextMenuSettings.show = false}>Cancel</li>
        </ul>
    </div>
    <div 
        class="fixed inset-0"
        on:click={() => contextMenuSettings.show = false}
    ></div>
{/if}