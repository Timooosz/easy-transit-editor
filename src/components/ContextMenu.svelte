<script lang="ts">
    import { contextMenuSettings, defaultStationSettings, drawQueue, textPromtSettings } from "../shared/shared.svelte";
    import { addStation } from "../lib/transit.svelte";
    import { calculatePosition } from "../lib/bounds";
  import { tick } from "svelte";

    let currentId = 1;

    let element: HTMLElement | undefined = $state();
    let windowPosition = $state({x: contextMenuSettings.x, y: contextMenuSettings.y})

    $effect(() => {
        if (element) {
            tick().then(() => {
                if (element) windowPosition = calculatePosition(window, contextMenuSettings.x, contextMenuSettings.y, element.offsetWidth, element.offsetHeight);
            });
        }
    });
</script>

{#if contextMenuSettings.show}
    <div bind:this={element}
        class="absolute bg-taupe-800 z-50"
        style:left="{windowPosition.x}px"
        style:top="{windowPosition.y}px"
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