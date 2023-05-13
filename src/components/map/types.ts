export interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Coverage {
    x: [number, number];
    y: [number, number];
}

export type DoorPosition = 'tr' | 'tl' | 'br' | 'bl' | 'rb' | 'rt' | 'lb' | 'lt';