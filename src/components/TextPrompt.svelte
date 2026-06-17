<script lang="ts">
    import { addTextField } from "../lib/transit.svelte";
    import { drawQueue, textPromtSettings } from "../shared/shared.svelte";

    let currentId = 1;

    const submitPrompt = () => {
        addTextField({
            id: currentId,
            x: drawQueue.pointQueue.x, y: drawQueue.pointQueue.y,
            rotation: 0,
            text: textPromtSettings.text
        })
        currentId++;
        console.log(textPromtSettings.text);
        textPromtSettings.show = false;
    }
</script>

{#if textPromtSettings.show}
    <div 
        class="fixed inset-0 bg-black/20 backdrop-blur-lg z-50"
        on:click={() => textPromtSettings.show = false}
    ></div>
    <div class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div class="bg-taupe-800 p-4 pointer-events-auto flex flex-col">
            <h2 class="text-xl text-taupe-200 m-2">Enter your text</h2>
            <textarea class="bg-taupe-700 w-md h-32 m-2 p-1 text-taupe-200" bind:value={textPromtSettings.text}></textarea>
            <p class="text-sm text-taupe-200/50 m-2">Use *stars* for headings and _underscores_ for subtitles</p>
            <p class="text-sm text-taupe-200/50 m-2">The text display can execute html. Don't submit text you don't understand!</p>
            <button class="m-2 p-2 bg-taupe-700 hover:bg-taupe-600" on:click={submitPrompt}>Submit</button>
        </div>
    </div>
{/if}
