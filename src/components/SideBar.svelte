<script lang="ts">
    import StylizedInput from "./StylizedInput.svelte";
    import ColorPicker from "svelte-awesome-color-picker"
    import { gridSettings, drawSettings } from "../shared/shared.svelte";
</script>

<div class="bg-taupe-800">
    <div class="flex justify-center">
        <h2 class="text-taupe-200 text-3xl font-bold m-2">easy-transit-editor</h2>
    </div>

    <hr class="my-1 mx-2 text-taupe-700">

    <h3 class="text-taupe-200 text-xl font-bold m-2">Grid Settings</h3>

    <StylizedInput label="Grid Size" value={gridSettings.size} onChange={(x: number) => gridSettings.size = x} />
    <div class="flex flex-row">
        <StylizedInput label="Width" value={gridSettings.width} onChange={(x: number) => gridSettings.width = x} />
        <StylizedInput label="Height" value={gridSettings.height} onChange={(x: number) => gridSettings.height = x} />
    </div>

    <hr class="m-4 text-taupe-700">

    <h3 class="text-taupe-200 text-xl font-bold m-2">Line Settings</h3>

    <StylizedInput label="Line width" value={drawSettings.width} onChange={(x: number) => drawSettings.width = x} />
    <StylizedInput label="Layer" value={drawSettings.layer} onChange={(x: number) => drawSettings.layer = x} />

    <ColorPicker onInput={(event) => drawSettings.color = event.hex} position="responsive"/>
</div>