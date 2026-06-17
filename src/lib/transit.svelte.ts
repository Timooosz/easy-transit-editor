import { transitData, drawSettings, drawQueue, contextMenuSettings, action } from "../shared/shared.svelte";

import type { line, station } from "../types/types"
import { lineIntersects } from "./eteMath";

const addLine = (line: line) => {
    transitData.lines = [...transitData.lines, line];
}

export const addStation = (station: station) => {
    transitData.stations = [...transitData.stations, station];
}

const handleDrawInput = (x: number, y: number, mX: number, mY: number) => {
    if (drawQueue.secondInput) {

        drawQueue.secondInput = false;

        if (x === drawQueue.pointQueue.x && y === drawQueue.pointQueue.y) {
            contextMenuSettings.x = mX;
            contextMenuSettings.y = mY;
            contextMenuSettings.show = true;
            return;
        }

        addLine({from: drawQueue.pointQueue, to: {x, y}, layer: drawSettings.layer, color: drawSettings.color, width: drawSettings.width, drawPreview: false})
        transitData.previewLine = null;
        return;
    }
    drawQueue.pointQueue = {x, y};
    drawQueue.secondInput = true;
}

const handleEditInput = (x: number, y: number, mX: number, mY: number) => {
    return;
}

const handleDeleteInput = (x: number, y: number) => {
    transitData.lines = transitData.lines.filter((line) => {
        return !lineIntersects(line, x, y);
    });
    transitData.stations = transitData.stations.filter((station) => {
        return station.x != x || station.y != y;
    });
}

export const handleInput = (x: number, y: number, mX: number, mY: number) => {
    switch(action.action) {
        case("Draw"):
            handleDrawInput(x, y, mX, mY);
            break;
        case("Edit"):
            handleEditInput(x, y, mX, mY);
            break;
        case("Delete"):
            handleDeleteInput(x, y);
            break;
    }
}

export const updatePreview = (x: number, y: number) => {
    if (drawQueue.secondInput) {
        transitData.previewLine = {from: drawQueue.pointQueue, to: {x, y}, layer: drawSettings.layer, color: drawSettings.color, width: drawSettings.width, drawPreview: true}
        return;
    }
    transitData.previewLine = null;
}