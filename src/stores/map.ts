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

// TOKEN
export const tokenPosition = writable(getCoordinates(DEFAULT_POSITION));

export const updateTokenPosition = (position: Position) => {
    tokenPosition.update(() => {
        return getCoordinates({
            x: position.x - position.width / 2,
            y: position.y - position.height / 2,
            width: position.width / 2,
            height: position.height / 2,
        });
    });
};

// ASSETS
export const assetsCoordinates = writable<
    | {}
    | {
          [key: string]: Coordinates;
      }
>({});

export const updateAssetsCoordinates = (name: string, ref: HTMLDivElement | HTMLImageElement) => {
    if(!ref) return;
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
        console.log(name,parent.offsetLeft, parent.offsetTop)
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

export const preventClickOnAsset = (tokenPosition: Position) => {
    const assetsCoordinatesInMap = get(assetsCoordinates);

    const tokenCoordinates = getCoordinates({
        x: tokenPosition.x - tokenPosition.width / 2,
        y: tokenPosition.y - tokenPosition.height / 2,
        width: tokenPosition.width,
        height: tokenPosition.height,
    });

    // Validate if token is inside any asset
    const isTokenInsideAsset = Object.values(assetsCoordinatesInMap).some(
        (asset: Coordinates, i) => {
            let { x: assetX, y: assetY } = asset;
            const { x: tokenX, y: tokenY } = tokenCoordinates;

            // Check if the x coordinates overlap
            if (
                (tokenX[0] < assetX[1] && tokenX[1] > assetX[0]) ||
                (tokenX[1] > assetX[1] && tokenX[0] < assetX[0])
            ) {
                // Check if the y coordinates overlap
                if (
                    (tokenY[0] < assetY[1] && tokenY[1] > assetY[0]) ||
                    (tokenY[1] > assetY[1] && tokenY[0] < assetY[0])
                ) {
                    return true;
                }
            }
            // No collision
            return false;
        },
    );

    return isTokenInsideAsset;
};

// To check the token trajectory before moving it and preventing it from overlapping with assets
export const validateIntersectionWithAsset = (afterTokenPosition: Position) => {
    const assetsCoordinatesInMap = getAssetsCoordinates();
    const prevTokenCoordinates = getTokenPosition();
    const afterTokenCoordinates = getCoordinates(afterTokenPosition);

    const prevPosition = {
        x: prevTokenCoordinates.x[0] + afterTokenPosition.width / 2,
        y: prevTokenCoordinates.y[0] + afterTokenPosition.height / 2,
    } as Position;

    let tokenDirection = {
        x: [prevTokenCoordinates.x[0], afterTokenCoordinates.x[1]],
        y: [prevTokenCoordinates.y[0], afterTokenCoordinates.y[1]],
    } as Coordinates;

    // Check if the token's trajectory intersects with any asset
    const newTokenPosition = Object.values(assetsCoordinatesInMap)
        // Sort to make sure the closest asset is checked first
        .sort(sortByClosestAssetDistance)
        .reduce((acc, asset: Coordinates, i: number) => {
            const newPosition = calcAssetsIntersection(acc, asset, tokenDirection);

            const positionHasChanged = newPosition.x !== acc.x || newPosition.y !== acc.y;

            const accHasChanged = acc.x !== afterTokenPosition.x || acc.y !== afterTokenPosition.y;

            if (positionHasChanged && !accHasChanged) {
                // Update the token direction for the other assets to consider the updated position
                tokenDirection = {
                    x: [tokenDirection.x[0], newPosition.x],
                    y: [tokenDirection.y[0], newPosition.y],
                };
                return newPosition;
            } else if (positionHasChanged && accHasChanged) {
                // Cancel the position change
                // Happen when the is multiple assets collision 
                return prevPosition;
            } else {
                return acc;
            }
        }, afterTokenPosition);

    const hasNewPosition =
        newTokenPosition.x !== afterTokenPosition.x || newTokenPosition.y !== afterTokenPosition.y;

    // Revalidate to make sure the token is not inside another asset
    const isTokenInsideAsset = preventClickOnAsset(newTokenPosition);

    // Set the new position
    if (hasNewPosition && !isTokenInsideAsset) {
        return { ...afterTokenPosition, ...newTokenPosition };
    } else if (isTokenInsideAsset && hasNewPosition) {
        return { ...afterTokenPosition, ...prevPosition };
    } else {
        return afterTokenPosition;
    }

    function getAssetsCoordinates() {
        return get(assetsCoordinates);
    }

    function getTokenPosition() {
        return get(tokenPosition);
    }

    function sortByClosestAssetDistance(a: Coordinates, b: Coordinates) {
        const aDistance = calculateDistance(a.x[0], a.y[0]);
        const bDistance = calculateDistance(b.x[0], b.y[0]);
        return aDistance - bDistance;
    }

    function calculateDistance(x: number, y: number) {
        return Math.sqrt(
            Math.pow(x - prevTokenCoordinates.x[0], 2) + Math.pow(y - prevTokenCoordinates.y[0], 2),
        );
    }

    function calcAssetsIntersection(
        acc: typeof afterTokenPosition,
        asset: Coordinates,
        tokenDirection: Coordinates,
    ): Position {
        const assetXRange = asset.x;
        const assetYRange = asset.y;
        const tokenXRange = [tokenDirection.x[0], tokenDirection.x[1]];
        const tokenYRange = [tokenDirection.y[0], tokenDirection.y[1]];

        const isXOverlap =
            (tokenXRange[0] < assetXRange[1] && tokenXRange[1] > assetXRange[0]) ||
            (tokenXRange[0] > assetXRange[0] && tokenXRange[1] < assetXRange[1]);

        const isYOverlap =
            (tokenYRange[0] < assetYRange[1] && tokenYRange[1] > assetYRange[0]) ||
            (tokenYRange[0] > assetYRange[0] && tokenYRange[1] < assetYRange[1]);

        if (isXOverlap && isYOverlap) {
            return calcAssetIntersection({
                assetXRange,
                assetYRange,
                tokenXRange,
                tokenYRange,
            });
        } else {
            return acc;
        }
    }

    function calcAssetIntersection({
        assetXRange,
        assetYRange,
        tokenXRange,
        tokenYRange,
    }: {
        assetXRange: number[];
        assetYRange: number[];
        tokenXRange: number[];
        tokenYRange: number[];
    }): typeof afterTokenPosition {
        const tokenRect = {
            width: afterTokenPosition.width,
            height: afterTokenPosition.height,
        };
        const isComingFromRight = tokenXRange[0] >= assetXRange[1];
        const isComingFromLeft = tokenXRange[0] <= assetXRange[0];
        const isComingFromBottom = tokenYRange[0] >= assetYRange[1];
        const isComingFromTop = tokenYRange[0] <= assetYRange[0];

        let closestX = prevPosition.x;
        let closestY = prevPosition.y;

        // Determine the closest position based on the direction of the token
        if (isComingFromRight && isComingFromTop) {
            // RIGHT TOP
            closestX = assetXRange[1] + tokenRect.width / 2;
            closestY = assetYRange[0] - tokenRect.height / 2;
        } else if (isComingFromRight && isComingFromBottom) {
            // RIGHT BOTTOM
            closestX = assetXRange[1] + tokenRect.width / 2;
            closestY = assetYRange[1] + tokenRect.height / 2;
        } else if (isComingFromLeft && isComingFromTop) {
            // LEFT TOP
            closestX = assetXRange[0] - tokenRect.width / 2;
            closestY = assetYRange[0] - tokenRect.height / 2;
        } else if (isComingFromLeft && isComingFromBottom) {
            // LEFT BOTTOM
            closestX = assetXRange[0] - tokenRect.width / 2;
            closestY = assetYRange[1] + tokenRect.height / 2;
        } else if (isComingFromRight) {
            // RIGHT
            closestX = assetXRange[1] + tokenRect.width / 2;
            closestY = tokenYRange[1] - tokenRect.height;
        } else if (isComingFromLeft) {
            // LEFT
            closestX = assetXRange[0] - tokenRect.width / 2;
            closestY = tokenYRange[1] - tokenRect.height;
        } else if (isComingFromTop) {
            // TOP
            closestX = tokenXRange[1] - tokenRect.width;
            closestY = assetYRange[0] - tokenRect.height / 2;
        } else if (isComingFromBottom) {
            // BOTTOM
            closestX = tokenXRange[1] - tokenRect.width;
            closestY = assetYRange[1] + tokenRect.height / 2;
        }

        return {
            x: closestX,
            y: closestY,
            width: afterTokenPosition.width,
            height: afterTokenPosition.height,
        };
    }
};
