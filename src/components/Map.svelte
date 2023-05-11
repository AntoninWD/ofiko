<script lang="ts">
    import AvatarToken from './AvatarToken.svelte';
    import { onMount } from 'svelte';
    import {
        MAP_WIDTH,
        MAP_HEIGHT,
        TOKEN_SIZE,
        HEADER_HEIGHT,
        MOVEMENT_SPEED,
        DEFAULT_POSITION,
    } from '../configs/map'
    import ClickAnimate from './common/ClickAnimate.svelte';

    interface Position {
        x: number;
        y: number;
    }

    let mapRef: HTMLButtonElement;

    let position = DEFAULT_POSITION;
    let duration = 0;
    let isMoving = false;
    let windowWidth = 0;
    let windowHeight = 0;
    let triggerClick = false;

    onMount(() => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight - HEADER_HEIGHT;
    });

    $: mapCenter = {
        x: windowWidth / 2,
        y: windowHeight / 2,
    };
    $: mapPosition = calcMapPosition(position, mapCenter);
    $: hasRendered = windowHeight > 0 && windowWidth > 0;

    function getClickPosition(e: MouseEvent) {
        const mapRect = mapRef.getBoundingClientRect();

        if (isMoving) return;

        isMoving = true;
        triggerClick = true;

        let x = e.clientX - mapRect.left;
        let y = e.clientY - mapRect.top;

        // Make sure token is not outside the map
        x = Math.max(x, TOKEN_SIZE / 2);
        x = Math.min(x, mapRect.width - TOKEN_SIZE / 2);

        y = Math.max(y, TOKEN_SIZE / 2);
        y = Math.min(y, mapRect.height - TOKEN_SIZE / 2);

        // Calculate the distance between the click and the token's current position
        const dx = x - position.x;
        const dy = y - position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate the transition duration based on the distance
        duration = (distance / MOVEMENT_SPEED) * 1000;

        // To allow click when the token as reach 80% of the destination
        const durationBuffer = duration * 0.8;

        position = { x, y };

        // Prevent click if is moving
        setTimeout(() => {
            isMoving = false;
            triggerClick = false;
        }, durationBuffer);
    }

    function calcMapPosition(position: Position, map: Position) {
        let x = position.x;
        let y = position.y;

        // Prevent grid from moving outside the map
        x = Math.max(x, map.x);
        x = Math.min(x, MAP_WIDTH - map.x);

        y = Math.max(y, map.y);
        y = Math.min(y, MAP_HEIGHT - map.y);

        return {
            x: x - map.x,
            y: y - map.y,
        };
    }

</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div
    class="bg-slate-600 absolute transition-all"
    style="transform: translate(-{mapPosition.x}px, -{mapPosition.y}px); transition-duration: {duration}ms;"
>
    <div class="relative" style="width: {MAP_WIDTH}px; height: {MAP_HEIGHT}px">
        <button
            bind:this={mapRef}
            on:click={getClickPosition}
            class={`rounded shadow-md bg-white bg-grid w-[99%] h-[99%] bg-repeat absolute-centered`}
        >
            {#if hasRendered}
                <AvatarToken {position} {duration} />
            {/if}
            <ClickAnimate {triggerClick} {position}/>
        </button>
    </div>
</div>
