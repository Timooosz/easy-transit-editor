<script lang="ts">
    import { getCurrentTheme } from "../lib/themes.svelte";

    let {label, value, onChange, min=undefined} = $props();
</script>

<div class="flex flex-col m-2">
    <label for="number-input" class="{getCurrentTheme().text_default}">{label}</label>
    <input id="number-input" type="number" bind:value onchange={() => onChange?.(value)} min="{min}"
        class="px-3 py-2 mt-1 rounded-xl {getCurrentTheme().bg_secondary} w-fill border border-default-medium"
    />
</div>