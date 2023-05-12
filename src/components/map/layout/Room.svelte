<script lang="ts">
    import Wall from '../assets/Wall.svelte';
    import type { DoorPosition } from '../types';
    export let height: number;
    export let width: number;
    // Stands for door position ex: tr = top right
    export let doorPosition: DoorPosition;
    export let position: { top?: number; left?: number; bottom?: number; right?: number };
</script>

<div
    class="absolute"
    style="top: {position.top}px; left: {position.left}px; bottom: {position.bottom}px; right: {position.right}px"
>
    <div class="relative" style="height: {height}px; width: {width}px;">
        <Wall placement="top" {doorPosition} />
        <Wall placement="bottom" {doorPosition} />
        <Wall placement="left" {doorPosition} />
        <Wall placement="right" {doorPosition} />
        <slot />
    </div>
</div>
