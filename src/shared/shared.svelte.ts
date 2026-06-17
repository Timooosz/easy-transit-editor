import type { t_drawSettings, t_transitData } from "../types/types"

type actionType = "View" | "Draw" | "Edit" | "Delete"
export const action = $state<{ action: actionType }>({
    action: "View"
});

export const gridSettings = $state({
    width: 10,
    height: 10,
    size: 2
});

export const position = $state({
    x: 0,
    y: 0,
    onGrid: false
});

export const drawSettings: t_drawSettings = $state({
    width: 10,
    layer: 0,
    color: "#ff0000"
});

export const contextMenuSettings = $state({
    x: 0,
    y: 0,
    show: false
});

export const stationMenuSettings = $state({
    x: 0,
    y: 0,
    show: false,
    id: 0
});

export const defaultStationSettings = $state({
    width: 1,
    height: 1,
    thickness: 20,
    roundness: 50,
    borderThickness: 2
});

export const stationClipboard = $state({
    width: 1,
    height: 1,
    thickness: 20,
    roundness: 50,
    borderThickness: 2
});

// Transit Data

export const drawQueue = $state({
    pointQueue: {x: 0, y: 0},
    secondInput: false
})

export const transitData: t_transitData = $state({
    lines: [],
    stations: [],
    previewLine: null
})