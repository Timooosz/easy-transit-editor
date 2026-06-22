<script lang="ts">
    import { getCurrentTheme } from "../lib/themes.svelte";

    let {label, value, onChange} = $props();
</script>

<div class="flex flex-col m-2">
    <label for="number-input" class="{getCurrentTheme().text_default}">{label}</label>
    <input id="number-input" type="range" bind:value onchange={() => onChange?.(value)}
        class=""
    />
</div>