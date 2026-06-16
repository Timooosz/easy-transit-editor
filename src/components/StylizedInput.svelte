<script lang="ts">
    let {label, value, onChange} = $props();
</script>

<div class="flex flex-col m-2">
    <label for="number-input" class="text-taupe-200">{label}</label>
    <input type="number" bind:value onchange={() => onChange?.(value)} min="1"
        class="px-3 py-2 mt-1 rounded-xl bg-taupe-700 w-fill border border-default-medium"
    />
</div>