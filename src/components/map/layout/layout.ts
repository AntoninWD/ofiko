import type { DoorPosition } from '../types';
import type { Position } from '../types';

interface Room {
    width: number;
    height: number;
    doorPosition: DoorPosition;
    position: Position;
}

export const layoutConfig = {
    rooms: {
        kitchen: {
            width: 1200,
            height: 800,
            doorPosition: 'br',
            position: {
                x: 0,
                y: 0,
            }
        },
    },
} as {
    rooms: {
        [key: string]: Room;
    };
};
