import type { Position, Coordinates } from '../components/map/types';

export const getCoordinates = (position: Position): Coordinates => {
    const { x, y, width, height } = position;
    return {
        x: [x, x + width],
        y: [y, y + height],
    };
};

export const transformOffsetToCoordinates = (ref: HTMLDivElement) => {
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = ref;
    return {
        x: [offsetLeft - offsetWidth, offsetLeft + offsetWidth],
        y: [offsetTop - offsetHeight, offsetTop + offsetHeight],
    };
};
