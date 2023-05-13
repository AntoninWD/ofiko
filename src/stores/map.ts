import { writable } from 'svelte/store';
import { DEFAULT_POSITION } from '../configs/map';
import type { Position } from '../components/map/types';
import { getCoverage } from '../utils/map';


export const tokenPosition = writable(getCoverage(DEFAULT_POSITION));

export const updateTokenPosition = (position: Position) => {
    console.log('updateTokenPosition', position)
    tokenPosition.update(() => {
        return getCoverage(position);
    });
}

// get assets positions (cached them for performance)
// stop token from moving its at 0px of an asset

