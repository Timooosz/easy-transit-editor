export type point = {
        x: number,
        y: number
    }

export type line = {
    from: point,
    to: point,
    layer: number,
    width: number,
    color: string | null
}

export type station = {
    x: number,
    y: number
}

export type t_transitData = {
    lines: line[],
    stations: station[]
}

export type t_drawSettings = {
    width: number,
    layer: number,
    color: string | null
}