import { transitData, drawSettings, drawQueue, contextMenuSettings } from "../shared/shared.svelte";
import type { line } from "../types/types"


const addLine = (line: line) => {
    transitData.lines = [...transitData.lines, line];
}

export const handleInput = (x: number, y: number, mX: number, mY: number) => {
    if (drawQueue.secondInput) {

        drawQueue.secondInput = false;

        if (x === drawQueue.pointQueue.x && y === drawQueue.pointQueue.y) {
            contextMenuSettings.x = mX;
            contextMenuSettings.y = mY;
            contextMenuSettings.show = true;
            return;
        }

        addLine({from: drawQueue.pointQueue, to: {x, y}, layer: drawSettings.layer, color: drawSettings.color, width: drawSettings.width})
        return;
    }
    drawQueue.pointQueue = {x, y};
    drawQueue.secondInput = true;
}