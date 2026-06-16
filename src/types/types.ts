export type point = {
        x: number,
        y: number
    }

export type line = {
    from: point,
    to: point,
    layer: number,
    width: number,
    color: string
}

export type t_transitData = {
    lines: line[]
}