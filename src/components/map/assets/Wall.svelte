<script lang="ts">
    export let placement: 'top' | 'bottom' | 'left' | 'right';
    export let doorPosition: 'tr' | 'tl' | 'br' | 'bl' | 'rb' | 'rt' | 'lb' | 'lt';
    let wallStyle = '';
    let heightStyle = placement === 'top' || placement === 'bottom' ? 'w-full' : 'h-full';

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

    const shouldMoveWall = oppositeDoorPlacement[placement].includes(doorPosition);
    const hasDoor = wallWithDoor[placement].includes(doorPosition);

    if (hasDoor) {
        wallStyle =
            placement === 'top'
                ? 'border-t-[12px]'
                : placement === 'bottom'
                ? 'border-b-[12px]'
                : placement === 'left'
                ? 'border-l-[12px]'
                : 'border-r-[12px]';

        heightStyle = placement === 'top' || placement === 'bottom' ? 'w-[70%]' : 'h-[70%]';
    }

    if (shouldMoveWall) {
        wallStyle += placement === 'top'
                ? ' right-0'
                : placement === 'bottom'
                ? ' right-0'
                : placement === 'left'
                ? ' bottom-0'
                : ' bottom-0';
    }
</script>

<div
    class="absolute border-[12px] border-slate-300 border-solid {wallStyle}  {heightStyle}"
    style="{placement}: 0;"
/>
