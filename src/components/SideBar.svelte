<script lang="ts">
    import StylizedInput from "./StylizedInput.svelte";
    import ActionSelectorGroup from "./ActionSelectorGroup.svelte";

    import ColorPicker from "svelte-awesome-color-picker"

    import { gridSettings, drawSettings, measurements, setTransitData, transitSVG } from "../shared/shared.svelte";
    import { getCurrentTheme, getDarkMode } from "../lib/themes.svelte";
    import ThemeSelector from "./ThemeSelector.svelte";
    import FileButton from "./FileButton.svelte";
    import { downloadJsonData, exportSvgComponent, uploadJsonData } from "../lib/files.svelte";
    import { transitData } from "../shared/shared.svelte";
    import type { t_transitData } from "../types/types";

    let element: HTMLElement;
    $effect(() => {
        if (element) {
            const rect = $derived(element.getBoundingClientRect());
            measurements.sbWidth = rect.width;
        }
    })
</script>

<div bind:this={element} class="{getCurrentTheme().bg_main} overflow-scroll">
    <div class="flex flex-row justify-center">
        <h2 class="{getCurrentTheme().text_default} text-3xl font-bold m-2">easy-transit-editor</h2>
        <ThemeSelector />
    </div>

    <hr class="my-1 mx-2 {getCurrentTheme().seperator}">

    <ActionSelectorGroup />

    <hr class="my-1 mx-2 {getCurrentTheme().seperator}">

    <h3 class="{getCurrentTheme().text_default} text-xl font-bold m-2">Grid Settings</h3>

    <StylizedInput label="Grid Size" value={gridSettings.size} onChange={(x: number) => gridSettings.size = x} min={1} />
    <div class="flex flex-row">
        <StylizedInput label="Width" value={gridSettings.width} onChange={(x: number) => gridSettings.width = x} min={1} />
        <StylizedInput label="Height" value={gridSettings.height} onChange={(x: number) => gridSettings.height = x} min={1} />
    </div>

    <hr class="m-4 {getCurrentTheme().seperator}">

    <h3 class="{getCurrentTheme().text_default} text-xl font-bold m-2">Line Settings</h3>

    <StylizedInput label="Line width" value={drawSettings.width} onChange={(x: number) => drawSettings.width = x} min={1} />
    <StylizedInput label="Layer" value={drawSettings.layer} onChange={(x: number) => drawSettings.layer = x} />

    <div style="{getDarkMode() ? "--cp-bg-color: #333; --cp-border-color: white; --cp-text-color: white; --cp-input-color: #555; --cp-button-hover-color: #777" : ""} m-2">
        <ColorPicker bind:hex={drawSettings.color} onInput={(event) => drawSettings.color = event.hex} position="responsive" />
    </div>

    <div class="m-4">
        <div class="flex flex-row justify-center">
            <FileButton text="Upload JSON" onclick={async ()=>{
                const data = await uploadJsonData();
                if (data) setTransitData(data as t_transitData);
            }} />
            <FileButton text="Download JSON" onclick={() => downloadJsonData(transitData)} />
        </div>
        <FileButton text="Download SVG" onclick={() => {
            if (transitSVG.svg) exportSvgComponent(transitSVG.svg)
        }} />
    </div>
</div>