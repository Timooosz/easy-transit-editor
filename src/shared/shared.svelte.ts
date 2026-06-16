import type { t_transitData } from "../types/types"

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

export const drawSettings = $state({
    width: 10,
    layer: 0
});

// Transit Data

export const drawQueue = $state({
    pointQueue: {x: 0, y: 0},
    secondInput: false
})

export const transitData: t_transitData = $state({
    lines: []
})