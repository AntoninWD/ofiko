import { writable, get } from 'svelte/store';
import { DEFAULT_POSITION } from '../configs/map';
import type { Position, Coordinates } from '../components/map/types';
import { getCoordinates } from '../utils/map';

// MAP
export const mapCoordinates = writable<
    | DOMRect
    | {
          x: number;
          y: number;
      }
>({
    x: 0,
    y: 0,
});

export const updateMapCoordinates = (ref: HTMLDivElement) => {
    mapCoordinates.update(() => ref.getBoundingClientRect());
};

const calcAssetsCoordinatesInMap = (assetsCoordinates: Coordinates) => {
    // compare only from starting point
    let assetsSpecs = {
        x: assetsCoordinates.x[0],
        y: assetsCoordinates.y[0],
    };

    const mapCoord = get(mapCoordinates);

    const assetsCoordinatesInMap = {
        x: assetsSpecs.x - mapCoord.x,
        y: assetsSpecs.y - mapCoord.y,
    };
    return assetsCoordinatesInMap;
};

// TOKEN
export const tokenPosition = writable(getCoordinates(DEFAULT_POSITION));

export const updateTokenPosition = (position: Position) => {
    tokenPosition.update(() => {
        return getCoordinates(position);
    });
};

// ASSETS
export const assetsCoordinates = writable({});

export const updateAssetsCoordinates = (name: string, ref: HTMLDivElement) => {
    const position = ref.getBoundingClientRect();
    const { width, height } = position;
    const coordinates = getCoordinates(position);

    assetsCoordinates.update((prevCoordinates) => {
        return {
            ...prevCoordinates,
            [name]: getCoordinates({ ...calcAssetsCoordinatesInMap(coordinates), width, height }),
        };
    });
};
