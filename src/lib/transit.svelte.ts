import { transitData, drawSettings, drawQueue, contextMenuSettings, action, stationMenuSettings } from "../shared/shared.svelte";

import type { line, station } from "../types/types"
import { lineIntersects } from "./eteMath";

const addLine = (line: line) => {
    transitData.lines = [...transitData.lines, line];
}

export const addStation = (station: station) => {
    transitData.stations = [...transitData.stations, station];
}

export const editStation = (id: number, updatedData: Partial<Omit<station, 'id'>>) => {
    const index = transitData.stations.findIndex(s => s.id === id);
    if (index !== -1) {
        transitData.stations[index] = { ...transitData.stations[index], ...updatedData };
    }
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
    const stationCandidates = transitData.stations.filter((station) => station.x === x && station.y === y);
    if (stationCandidates.length > 0) {
        const stationCandidate = stationCandidates[0];
        stationMenuSettings.x = mX;
        stationMenuSettings.y = mY;
        stationMenuSettings.id = stationCandidate.id;
        stationMenuSettings.show = true;
        return;
    }

    const colorPickCandidates = transitData.lines.filter((line) => lineIntersects(line, x, y));
    console.log(colorPickCandidates)
    if (colorPickCandidates.length === 0) return;
    const highestLayerLine = colorPickCandidates.sort((a, b) => a.layer - b.layer)[0]
    drawSettings.color = highestLayerLine.color;
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