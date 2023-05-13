import type { Position, Coverage } from '../components/map/types';

export const getCoverage = (position: Position): Coverage => {
    const { x, y, width, height } = position;
    return {
        x: [x - width, x + width],
        y: [y - height, y + height],
    };
};
