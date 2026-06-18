export type point = {
        x: number,
        y: number
    }

export type line = {
    from: point,
    to: point,
    layer: number,
    width: number,
    color: string | null,
    drawPreview: boolean
}

export type station = {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    thickness: number,
    roundness: number,
    borderThickness: number
}

export type textField = {
    id: number,
    x: number,
    y: number,
    rotation: number,
    text: string,
    bg: boolean,
    bgBasePos: point,
    bgBaseSize: point,
    bgWidth: number,
    bgHeight: number,
    bgColor: string,
    bgRoundness: point
}

export type t_transitData = {
    lines: line[],
    stations: station[],
    textFields: textField[],
    previewLine: line | null
}

export type t_drawSettings = {
    width: number,
    layer: number,
    color: string | null
}