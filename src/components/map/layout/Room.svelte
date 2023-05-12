<script lang="ts">
    import Wall from '../assets/Wall.svelte';
    export let height: number;
    export let width: number;
    // Stands for door position ex: tr = top right
    export let doorPosition: 'tr' | 'tl' | 'br' | 'bl' | 'rb' | 'rt' | 'lb' | 'lt';
</script>

<div class="relative" style="height: {height}px; width: {width}px">
    <Wall placement="top" {doorPosition} />
    <Wall placement="bottom" {doorPosition} />
    <Wall placement="left" {doorPosition} />
    <Wall placement="right" {doorPosition} />
    <slot />
</div>
