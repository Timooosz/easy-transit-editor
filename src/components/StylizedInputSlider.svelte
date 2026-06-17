<script lang="ts">
    let {label, value, onChange} = $props();
</script>

<div class="flex flex-col m-2">
    <label for="number-input" class="text-taupe-200">{label}</label>
    <input id="number-input" type="range" bind:value onchange={() => onChange?.(value)}
        class=""
    />
</div>