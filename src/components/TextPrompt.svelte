<script lang="ts">
    import { toPixels } from "../lib/eteMath";
    import { parseText } from "../lib/textParser";
    import { getCurrentTheme } from "../lib/themes.svelte";
    import { addTextField } from "../lib/transit.svelte";
    import { defaultTextFieldSettings, drawQueue, textPromtSettings } from "../shared/shared.svelte";
    import { TokenError } from "../types/exceptions";

    let currentId = 1;

    const getTSpans = (text: string, x: number) => {
        let tSpans = "";
        try{tSpans = parseText(text, toPixels(x))}
        catch(e) {
            if (e instanceof TokenError) {
                tSpans = `<tspan fill="red">Invalid Text</tspan>`
            } else {
                throw e;
            }
        }
        return tSpans;
    }

    const submitPrompt = () => {
        const textField = {
            id: currentId,
            x: drawQueue.pointQueue.x, y: drawQueue.pointQueue.y,
            rotation: defaultTextFieldSettings.rotation,
            text: getTSpans(textPromtSettings.text, drawQueue.pointQueue.x),
            bg: defaultTextFieldSettings.bg,
            bgBasePos: {x: 0, y: 0},
            bgBaseSize: {x: 0, y: 0},
            bgWidth: defaultTextFieldSettings.bgWidth,
            bgHeight: defaultTextFieldSettings.bgHeight,
            bgColor: defaultTextFieldSettings.bgColor,
            bgRoundness: defaultTextFieldSettings.bgRoundness,
            alignment: defaultTextFieldSettings.alignment
        };
        addTextField(textField);
        currentId++;
        textPromtSettings.show = false;
    }
</script>

{#if textPromtSettings.show}
    <div 
        class="fixed inset-0 bg-black/20 backdrop-blur-lg z-50"
        on:click={() => textPromtSettings.show = false}
    ></div>
    <div class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div class="{getCurrentTheme().bg_main} p-4 pointer-events-auto flex flex-col rounded-xl shadow-xl/20">
            <h2 class="text-xl {getCurrentTheme().text_default} m-2">Enter your text</h2>
            <textarea class="{getCurrentTheme().bg_secondary} w-md h-32 m-2 p-2 rounded-xl {getCurrentTheme().text_default}" bind:value={textPromtSettings.text}></textarea>
            <p class="text-sm {getCurrentTheme().text_secondary} m-2">Use *stars* for headings and _underscores_ for subtitles</p>
            <p class="text-sm {getCurrentTheme().text_secondary} m-2">The text display can execute html. Don't submit text you don't understand!</p>
            <button class="m-2 p-2 {getCurrentTheme().btn_default} rounded-xl" on:click={submitPrompt}>Submit</button>
        </div>
    </div>
{/if}
