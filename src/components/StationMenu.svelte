<script lang="ts">
    import { editStation } from "../lib/transit.svelte";
    import { stationMenuSettings, transitData, defaultStationSettings, stationClipboard } from "../shared/shared.svelte";
    import { calculatePosition } from "../lib/bounds";
    import type { station } from "../types/types";

    import StylizedInput from "./StylizedInput.svelte";
    import StylizedInputSlider from "./StylizedInputSlider.svelte";

    import { tick } from "svelte";
    import { getCurrentTheme } from "../lib/themes.svelte";

    let element: HTMLElement | undefined = $state();
    let windowPosition = $state({x: stationMenuSettings.x, y: stationMenuSettings.y})

    $effect(() => {
        if (element) {
            tick().then(() => {
                if (element) windowPosition = calculatePosition(window, stationMenuSettings.x, stationMenuSettings.y, element.offsetWidth, element.offsetHeight);
            });
        }
    });
    
    const stationCandidates = $derived(transitData.stations.filter((station) => station.id === stationMenuSettings.id));
    const currentSettings = $derived(stationCandidates.length != 0 ? stationCandidates[0] : null);

    const update = (data: Partial<Omit<station, 'id'>>) => {
        editStation(stationMenuSettings.id, data);
    }

    const setAsDefault = () => {
        if (currentSettings) {
            defaultStationSettings.width = currentSettings.width;
            defaultStationSettings.height = currentSettings.height;
            defaultStationSettings.thickness = currentSettings.thickness;
            defaultStationSettings.roundness = currentSettings.roundness;
            defaultStationSettings.borderThickness = currentSettings.borderThickness;
        }
    }

    const copySettings = () => {
        if (currentSettings) {
            stationClipboard.width = currentSettings.width;
            stationClipboard.height = currentSettings.height;
            stationClipboard.thickness = currentSettings.thickness;
            stationClipboard.roundness = currentSettings.roundness;
            stationClipboard.borderThickness = currentSettings.borderThickness;
        }
    }

    const pasteSettings = () => {
        editStation(stationMenuSettings.id, stationClipboard);
    }
</script>

{#if stationMenuSettings.show}
    <div bind:this={element}
        class="absolute {getCurrentTheme().bg_main} z-100 p-2 rounded-xl shadow-xl/20"
        style:left="{windowPosition.x}px"
        style:top="{windowPosition.y}px"
    >
        <h2 class="text-xl {getCurrentTheme().text_default}">Edit Station</h2>
        <div>
            <div class="flex flex-row">
                <StylizedInput label="Width" value={currentSettings?.width} onChange={(x: number) => {update({width: x})}} min={1} />
                <StylizedInput label="Height" value={currentSettings?.height} onChange={(x: number) => {update({height: x})}} min={1} />
            </div>
            <StylizedInput label="Thickness" value={currentSettings?.thickness} onChange={(x: number) => {update({thickness: x})}} min={1} />
            <StylizedInput label="Border Thickness" value={currentSettings?.borderThickness} onChange={(x: number) => {update({borderThickness: x})}} min={0} />
            
            <StylizedInputSlider label="Roundness" value={currentSettings?.roundness} onChange={(x: number) => {update({roundness: x})}} />

            <div class="flex flex-row justify-evenly">
                <button class="m-2 p-2 rounded-xl {getCurrentTheme().btn_default}" onclick={copySettings}>Copy Settings</button>
                <button class="m-2 p-2 rounded-xl {getCurrentTheme().btn_default}" onclick={pasteSettings}>Paste Settings</button>
                <button class="m-2 p-2 rounded-xl {getCurrentTheme().btn_default}" onclick={setAsDefault}>Set As Default</button>
            </div>
        </div>
    </div>
    <div 
        class="fixed inset-0"
        onclick={() => stationMenuSettings.show = false}
    ></div>
{/if}