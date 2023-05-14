<script lang="ts">
    import type { DoorPosition } from '../types';
    export let placement: 'top' | 'bottom' | 'left' | 'right';
    export let doorPosition: DoorPosition;
    export let name: string;
    import { onMount } from 'svelte';
    import { updateAssetsCoordinates } from '../../../stores/map';
    let ref: HTMLDivElement;

    onMount(() => {
        updateAssetsCoordinates(`${name}-wall-${placement}`, ref);
    });

    const isVertical = placement === 'top' || placement === 'bottom';
    const wallWithDoor = {
        top: ['tr', 'tl'],
        bottom: ['br', 'bl'],
        left: ['lb', 'lt'],
        right: ['rb', 'rt'],
    };
    const oppositeDoorPlacement = {
        top: 'tl',
        bottom: 'bl',
        left: 'lt',
        right: 'rt',
    };

    const shouldMoveWall = oppositeDoorPlacement[placement] === doorPosition;
    const hasDoor = wallWithDoor[placement].includes(doorPosition);

    let wallStyle = 'border-[12px]';
    let wallSize = isVertical ? 'w-full' : 'h-full';

    if (hasDoor) {
        wallSize = isVertical ? 'w-[calc(100%-175px)]' : 'h-[calc(100%-175px)]';

        if (shouldMoveWall) {
            wallStyle += isVertical ? ' right-0' : ' bottom-0';
        }
    }
</script>

<div
    bind:this={ref}
    class="absolute border-[12px] border-slate-200 shadow-sm border-solid {wallStyle} {wallSize}"
    style="{placement}: 0;"
/>
