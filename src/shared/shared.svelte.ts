import type { t_drawSettings, t_transitData } from "../types/types"

type actionType = "View" | "Draw" | "Edit" | "Delete"
export const action = $state<{ action: actionType }>({
    action: "View"
});

export const measurements = $state({
    sbWidth: 0,
    fHeight:0
})

export const gridSettings = $state({
    width: 30,
    height: 30,
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

// Station Menu

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

// Text Settings

export const textFieldMenuSettings = $state({
    x: 0,
    y: 0,
    show: false,
    id: 0
});

export const defaultTextFieldSettings = $state({
    rotation: 0,
    bgWidth: 5,
    bgHeight: 5,
    bg: false,
    bgColor: "#ff0000",
    bgRoundness: {x: 50, y: 50},
    alignment: "start"
});

export const textFieldClipboard = $state({
    rotation: 0,
    bgWidth: 5,
    bgHeight: 5,
    bg: false,
    bgColor: "#ff0000",
    bgRoundness: {x: 50, y: 50},
    alignment: "start"
});

export const textPromtSettings = $state({
    show: false,
    text: ""
})

// Transit Data

export const drawQueue = $state({
    pointQueue: {x: 0, y: 0},
    secondInput: false
})

export const transitData: t_transitData = $state({
    lines: [],
    stations: [],
    textFields: [],
    previewLine: null
})

export const setTransitData = (data: t_transitData) => {
    transitData.lines = data.lines;
    transitData.stations = data.stations;
    transitData.textFields = data.textFields;
}

export const transitSVG = $state<{svg: SVGElement | null}>({svg: null});