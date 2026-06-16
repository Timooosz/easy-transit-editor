import { transitData, drawSettings, drawQueue } from "../shared/shared.svelte";
import type { line } from "../types/types"


const addLine = (line: line) => {
    transitData.lines = [...transitData.lines, line];
}

export const handleInput = (x: number, y: number) => {
    if (drawQueue.secondInput) {

        drawQueue.secondInput = false;

        if (x === drawQueue.pointQueue.x && y === drawQueue.pointQueue.y) {
            return;
        }

        addLine({from: drawQueue.pointQueue, to: {x, y}, layer: drawSettings.layer, color: "red", width: drawSettings.width})
        return;
    }
    drawQueue.pointQueue = {x, y};
    drawQueue.secondInput = true;
}