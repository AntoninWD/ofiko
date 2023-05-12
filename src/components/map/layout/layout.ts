import type { DoorPosition } from '../types';

interface Room {
    name: string;
    width: number;
    height: number;
    doorPosition: DoorPosition;
    position: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    };
}

export const layoutConfig = {
    rooms: [
        {
            name: 'kitchen',
            width: 1200,
            height: 800,
            doorPosition: 'br',
            position: {
                top: 0,
                left: 0,
            },
        },
        {
            name: 'meeting',
            width: 700,
            height: 1000,
            doorPosition: 'lt',
            position: {
                bottom: 0,
                right: 0,
            }
        }
    ],
} as {
    rooms: Room[];
};
