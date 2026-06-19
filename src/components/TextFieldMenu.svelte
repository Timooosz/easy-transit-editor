<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import { editTextField } from "../lib/transit.svelte";
    import { transitData, textFieldClipboard, textFieldMenuSettings, defaultTextFieldSettings } from "../shared/shared.svelte";
    import { calculatePosition } from "../lib/bounds";
    import type { textField } from "../types/types";

    import StylizedInput from "./StylizedInput.svelte";
    import StylizedInputSlider from "./StylizedInputSlider.svelte";

    import { tick } from "svelte";

    let element: HTMLElement | undefined = $state();
    let windowPosition = $state({x: textFieldMenuSettings.x, y: textFieldMenuSettings.y})

    $effect(() => {
        if (element) {
            tick().then(() => {
                if (element) windowPosition = calculatePosition(window, textFieldMenuSettings.x, textFieldMenuSettings.y, element.offsetWidth, element.offsetHeight);
            });
        }
    });
    
    const textFieldCandidates = $derived(transitData.textFields.filter((textField) => textField.id === textFieldMenuSettings.id));
    const currentSettings = $derived(textFieldCandidates.length != 0 ? textFieldCandidates[0] : null);

    const update = (data: Partial<Omit<textField, 'id'>>) => {
        editTextField(textFieldMenuSettings.id, data);
    }

    const setAsDefault = () => {
        if (currentSettings) {
            defaultTextFieldSettings.bg = currentSettings.bg;
            defaultTextFieldSettings.bgColor = currentSettings.bgColor;
            defaultTextFieldSettings.bgRoundness = currentSettings.bgRoundness;
            defaultTextFieldSettings.rotation = currentSettings.rotation;
            defaultTextFieldSettings.bgWidth = currentSettings.bgWidth;
            defaultTextFieldSettings.bgHeight = currentSettings.bgHeight;
            defaultTextFieldSettings.alignment = currentSettings.alignment;
        }
    }

    const copySettings = () => {
        if (currentSettings) {
            textFieldClipboard.bg = currentSettings.bg;
            textFieldClipboard.bgColor = currentSettings.bgColor;
            textFieldClipboard.bgRoundness = currentSettings.bgRoundness;
            textFieldClipboard.rotation = currentSettings.rotation;
            textFieldClipboard.bgWidth = currentSettings.bgWidth;
            textFieldClipboard.bgHeight = currentSettings.bgHeight;
            textFieldClipboard.alignment = currentSettings.alignment;
        }
    }

    const pasteSettings = () => {
        editTextField(textFieldMenuSettings.id, textFieldClipboard);
    }
</script>

{#if textFieldMenuSettings.show}
    <div bind:this={element}
        class="absolute bg-taupe-800 z-100 p-2"
        style:left="{windowPosition.x}px"
        style:top="{windowPosition.y}px"
    >
        <h2 class="text-xl text-taupe-200">Edit Text</h2>
        <div>

            <div class="flex flex-row gap-2">
            <button 
                class="p-2 {currentSettings?.alignment === 'start' ? 'bg-taupe-600' : 'bg-taupe-700'} hover:bg-taupe-600"
                onclick={() => update({alignment: 'start'})}
            >
                Left
            </button>
            <button 
                class="p-2 {currentSettings?.alignment === 'middle' ? 'bg-taupe-600' : 'bg-taupe-700'} hover:bg-taupe-600"
                onclick={() => update({alignment: 'middle'})}
            >
                Center
            </button>
            <button 
                class="p-2 {currentSettings?.alignment === 'end' ? 'bg-taupe-600' : 'bg-taupe-700'} hover:bg-taupe-600"
                onclick={() => update({alignment: 'end'})}
            >
                Right
            </button>
        </div>

            <div class="flex flex-row">
                <input type="checkbox" bind:checked={currentSettings.bg} onchange={() => update({bg: currentSettings.bg})} />
                <p class="text-taupe-200">Background</p>
            </div>

            <ColorPicker bind:hex={currentSettings.bgColor} onInput={(event) => {update({bgColor: event.hex ?? "#ff0000"})}} position="responsive" />

            <div class="flex flex-row">
                <StylizedInput label="Width" value={currentSettings?.bgWidth} onChange={(x: number) => {update({bgWidth: x})}} />
                <StylizedInput label="Height" value={currentSettings?.bgHeight} onChange={(x: number) => {update({bgHeight: x})}} />
            </div>
            
            <StylizedInputSlider label="Roundness X" value={currentSettings?.bgRoundness.x} onChange={(x: number) => {update({bgRoundness: {x: x, y: currentSettings?.bgRoundness.y ? currentSettings.bgRoundness.y : 0}})}} />
            <StylizedInputSlider label="Roundness Y" value={currentSettings?.bgRoundness.y} onChange={(x: number) => {update({bgRoundness: {x: currentSettings?.bgRoundness.x ? currentSettings.bgRoundness.x : 0, y: x}})}} />

            <div class="flex flex-row justify-evenly">
                <button class="m-2 p-2 bg-taupe-700 hover:bg-taupe-600" onclick={copySettings}>Copy Settings</button>
                <button class="m-2 p-2 bg-taupe-700 hover:bg-taupe-600" onclick={pasteSettings}>Paste Settings</button>
                <button class="m-2 p-2 bg-taupe-700 hover:bg-taupe-600" onclick={setAsDefault}>Set As Default</button>
            </div>
        </div>
    </div>
    <div 
        class="fixed inset-0"
        onclick={() => textFieldMenuSettings.show = false}
    ></div>
{/if}