import { gridSettings } from "../shared/shared.svelte";
import type { line } from "../types/types";

export const toPixels = (x: number) => {
    const remToPx = 16;
    const offset = remToPx * gridSettings.size / 2;
    const conversionRate = remToPx * gridSettings.size;
    return offset + x * conversionRate;
}

export const lineIntersects = (line: line, x: number, y: number) => {
    const x1 = line.from.x;
    const x2 = line.to.x;
    const y1 = line.from.y;
    const y2 = line.to.y;

    const xMin = x - 0.5;
    const xMax = x + 0.5;
    const yMin = y - 0.5;
    const yMax = y + 0.5;

    let t0 = 0;
    let t1 = 1;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const clip = (p: number, q: number) => {
        if (p === 0) {
            return q >= 0;
        }

        const r = q / p;

        if (p < 0) {
            if (r > t1) return false;
            if (r > t0) t0 = r;
        } else {
            if (r < t0) return false;
            if (r < t1) t1 = r;
        }

        return true;
    }

    return (
        clip(-dx, x1 - xMin) &&
        clip( dx, xMax - x1) &&
        clip(-dy, y1 - yMin) &&
        clip( dy, yMax - y1)
    );
}

export const halfOpacity = (hex: string | null) => {
    if (hex === null) return;

    let hexWithoutHash = hex.startsWith("#") ? hex.slice(1) : hex;
    if (hexWithoutHash.length === 6) hexWithoutHash += "ff"

    const numericHex = parseInt(hexWithoutHash, 16);
    const rgb = numericHex & 0xffffff00;
    const opacity = numericHex & 0xff;
    
    const newHex = ((rgb | Math.floor(opacity / 2)) >>> 0).toString(16).padStart(8, "0");
    return "#" + newHex;
}