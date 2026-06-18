<script lang="ts">
    import { editStation } from "../lib/transit.svelte";
    import { stationMenuSettings, transitData, defaultStationSettings, stationClipboard } from "../shared/shared.svelte";
    import type { station } from "../types/types";

    import StylizedInput from "./StylizedInput.svelte";
    import StylizedInputSlider from "./StylizedInputSlider.svelte";
    
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
    <div
        class="absolute bg-taupe-800 z-100 p-2"
        style:left="{stationMenuSettings.x}px"
        style:top="{stationMenuSettings.y}px"
    >
        <h2 class="text-xl text-taupe-200">Edit Station</h2>
        <div>
            <div class="flex flex-row">
                <StylizedInput label="Width" value={currentSettings?.width} onChange={(x: number) => {update({width: x})}} min={1} />
                <StylizedInput label="Height" value={currentSettings?.height} onChange={(x: number) => {update({height: x})}} min={1} />
            </div>
            <StylizedInput label="Thickness" value={currentSettings?.thickness} onChange={(x: number) => {update({thickness: x})}} min={1} />
            <StylizedInput label="Border Thickness" value={currentSettings?.borderThickness} onChange={(x: number) => {update({borderThickness: x})}} min={0} />
            
            <StylizedInputSlider label="Roundness" value={currentSettings?.roundness} onChange={(x: number) => {update({roundness: x})}} />

            <div class="flex flex-row justify-evenly">
                <button class="m-2 p-2 bg-taupe-700 hover:bg-taupe-600" onclick={copySettings}>Copy Settings</button>
                <button class="m-2 p-2 bg-taupe-700 hover:bg-taupe-600" onclick={pasteSettings}>Paste Settings</button>
                <button class="m-2 p-2 bg-taupe-700 hover:bg-taupe-600" onclick={setAsDefault}>Set As Default</button>
            </div>
        </div>
    </div>
    <div 
        class="fixed inset-0"
        onclick={() => stationMenuSettings.show = false}
    ></div>
{/if}