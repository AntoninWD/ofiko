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

const rooms = [] as Room[];

rooms.push({
    name: 'Kitchen',
    width: 1200,
    height: 800,
    doorPosition: 'br',
    position: {
        top: 0,
        left: 0,
    },
});

rooms.push({
    name: 'Meeting',
    width: 700,
    height:900,
    doorPosition: 'lt',
    position: {
        bottom: 0,
        right: 0,
    },
});

rooms.push({
    name: 'Private Office',
    width: 600,
    height: 475,
    doorPosition: 'rt',
    position: {
        bottom: 0,
        left: 0,
    },
});

rooms.push({
    name: 'Private Office 2',
    width: 600,
    height: 485,
    doorPosition: 'rt',
    position: {
        bottom: rooms.find((room) => room.name === 'Private Office')?.height || 0,
        left: 0,
    },
});

export const layoutConfig = {
    rooms: rooms,
} as {
    rooms: Room[];
};
