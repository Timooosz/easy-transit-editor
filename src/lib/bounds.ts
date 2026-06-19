import { measurements } from "../shared/shared.svelte"

export const calculatePosition = (window: Window, x: number, y: number, w: number, h: number) => {
    const ww = window.innerWidth - measurements.sbWidth;
    const wh = window.innerHeight - measurements.fHeight;
    
    const padding = 10;

    const xOverflow = x + w + padding - ww;
    const yOverflow = y + h + padding - wh;

    return {x: x - Math.max(0, xOverflow), y: y - Math.max(0, yOverflow)};
}