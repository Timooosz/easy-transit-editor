import { gridSettings } from "../shared/shared.svelte";

export const toPixels = (x: number) => {
    const remToPx = 16;
    const offset = remToPx * gridSettings.size / 2;
    const conversionRate = remToPx * gridSettings.size;
    return offset + x * conversionRate;
}