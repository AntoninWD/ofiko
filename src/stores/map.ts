import { writable, get } from 'svelte/store';
import { DEFAULT_POSITION } from '../configs/map';
import type { Position, Coordinates } from '../components/map/types';
import { getCoordinates, transformOffsetToCoordinates } from '../utils/map';

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

// TOKEN
export const tokenPosition = writable(getCoordinates(DEFAULT_POSITION));

export const updateTokenPosition = (position: Position) => {
    tokenPosition.update(() => {
        return getCoordinates({
            ...position,
            width: position.width / 2,
            height: position.height / 2,
        });
    });
};

// ASSETS
export const assetsCoordinates = writable({});

export const updateAssetsCoordinates = (name: string, ref: HTMLDivElement) => {
    let parent = ref.offsetParent as HTMLDivElement;

    let assetsCoordinatesInMap: Position = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    // increment offset values until parent is map
    while (parent.id !== 'map') {
        parent = parent.offsetParent as HTMLDivElement;
        if (parent.id === 'map') break;
        assetsCoordinatesInMap = {
            ...assetsCoordinatesInMap,
            x: assetsCoordinatesInMap.x + parent.offsetLeft,
            y: assetsCoordinatesInMap.y + parent.offsetTop,
        };
    }

    // apply assets coordinates in map
    assetsCoordinatesInMap = {
        x: ref.offsetLeft + assetsCoordinatesInMap.x,
        y: ref.offsetTop + assetsCoordinatesInMap.y,
        width: ref.offsetWidth,
        height: ref.offsetHeight,
    };
    const coordinates = getCoordinates(assetsCoordinatesInMap);
    let newCoordinates = {};

    assetsCoordinates.update((prevCoordinates) => {
        newCoordinates = {
            ...prevCoordinates,
            [name]: coordinates,
        };
        return newCoordinates;
    });
};

export const verifyAssetsCollisionWithToken = (tokenPosition: Position) => {
    const assetsCoordinatesInMap = get(assetsCoordinates);
    console.log(assetsCoordinatesInMap);
    const tokenCoordinates = getCoordinates(tokenPosition);
    console.log(tokenCoordinates);
    // Validate if token is inside any asset
    const isTokenInsideAsset = Object.values(assetsCoordinatesInMap).some((asset: any, i) => {
        let { x: assetX, y: assetY } = asset;
        const { x: tokenX, y: tokenY } = tokenCoordinates;

        // check if negative
        if (assetY[0] < 0) {
            assetY[0] = 0;
        }

        if (assetX[0] < 0) {
            assetX[0] = 0;
        }

        // Check if the x coordinates overlap
        if (
            (tokenX[0] <= assetX[1] && tokenX[1] >= assetX[0]) ||
            (tokenX[1] >= assetX[1] && tokenX[0] <= assetX[0])
        ) {
            // Check if the y coordinates overlap
            if (
                (tokenY[0] <= assetY[1] && tokenY[1] >= assetY[0]) ||
                (tokenY[1] >= assetY[1] && tokenY[0] <= assetY[0])
            ) {
                // There is a collision
                console.log('collision!', i);
                console.log('token', tokenX, tokenY);
                console.log('asset', assetX, assetY);
                return true;
            }
        }
        // No collision
        return false;
    });
    console.log('isTokenInsideAsset', isTokenInsideAsset);
};
