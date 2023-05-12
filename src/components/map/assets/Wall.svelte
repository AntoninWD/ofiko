<script lang="ts">
    import type { DoorPosition } from '../types';
    export let placement: 'top' | 'bottom' | 'left' | 'right';
    export let doorPosition: DoorPosition;

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
        wallSize = isVertical ? 'w-[80%]' : 'h-[80%]';

        if (shouldMoveWall) {
            wallStyle += isVertical ? ' right-0' : ' bottom-0';
        }
    }
    
</script>

<div
    class="absolute border-[12px] border-slate-300 shadow-sm border-solid {wallStyle} {wallSize}"
    style="{placement}: 0;"
/>
