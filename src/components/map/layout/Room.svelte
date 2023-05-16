<script lang="ts">
    import Wall from '../assets/Wall.svelte';
    import Asset from '../assets/Asset.svelte';
    import type { DoorPosition } from '../types';
    export let height: number;
    export let width: number;
    export let name: string;
    // Stands for door position ex: tr = top right
    export let doorPosition: DoorPosition;
    export let position: { top?: number; left?: number; bottom?: number; right?: number };
</script>

<div
    id='room'
    class="absolute"
    style="top: {position.top}px; left: {position.left}px; bottom: {position.bottom}px; right: {position.right}px"
>
    <div class="relative" style="height: {height}px; width: {width}px;">
        <Wall {name} placement="top" {doorPosition} />

        <Wall {name} placement="bottom" {doorPosition} />

        <Wall {name} placement="left" {doorPosition} />

        <Wall {name} placement="right" {doorPosition} />

        <slot />
    </div>
</div>
