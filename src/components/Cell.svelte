<script lang="ts">
    import { position, action } from '../shared/shared.svelte'
    import { handleInput } from '../lib/transit.svelte';

    let selected = $state(false);
    let { size, x, y } = $props();

    let m = $state({x: 0, y: 0});

    function trackMouse(event) {
        m.x = event.clientX;
        m.y = event.clientY;
    }
    
    const select = () => {
        selected = true;
        position.x = x;
        position.y = y;
        position.onGrid = true;
    };
    const deselect = () => {
        selected = false;
        position.onGrid = false;
    };
</script>

<div
    // selected ? "bg-taupe-700 border-1 border-taupe-900" : "bg-taupe-950 border-1 border-taupe-900"
    class = "border-taupe-900 {selected ? "bg-taupe-700" : "bg-taupe-950"} {action.action === "View" ? "border-0" : "border-1"}"
    style:width = "{size}rem"
    style:height = "{size}rem"
    on:pointermove={trackMouse}
    on:mouseover = {select}
    on:mouseout = {deselect}
    on:click = {() => handleInput(x, y, m.x, m.y)}
></div>