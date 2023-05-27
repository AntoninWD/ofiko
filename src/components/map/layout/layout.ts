import type { DoorPosition } from '../types';
import Kitchen from '../room/Kitchen.svelte';
import Meeting from '../room/Meeting.svelte';
import PrivateOffice from '../room/PrivateOffice.svelte';

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
    template: typeof Kitchen;
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
    template: Kitchen
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
    template: Meeting
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
    template: PrivateOffice
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
    template: PrivateOffice
});

export const layoutConfig = {
    rooms: rooms,
} as {
    rooms: Room[];
};
