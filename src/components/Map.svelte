<script lang="ts">
    import AvatarToken from './AvatarToken.svelte';
    import { afterUpdate, onMount } from 'svelte';

    interface Position {
        x: number;
        y: number;
    }

    let mapRef: HTMLButtonElement;
    let rippleRef: HTMLDivElement;

    // TODO: place this in a config file
    const tokenSize = 48;
    const mapWidth = 5000;
    const mapHeight = 5000;
    const headerHeight = 56;
    const speed = 500;
    const defaultPosition = { x: mapWidth / 2, y: mapHeight / 2 };
    // ------------------------------
    let position = defaultPosition;
    let duration = 0;
    let rippleStyle = '';
    let isMoving = false;

    // get window size
    let windowWidth = 0;
    let windowHeight = 0;

    onMount(() => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight - headerHeight;
    });

    $: mapCenter = {
        x: windowWidth / 2,
        y: windowHeight / 2,
    };

    $: mapPosition = calcMapPosition(position, mapCenter);

    function getClickPosition(e: MouseEvent) {
        const mapRect = mapRef.getBoundingClientRect();

        if (isMoving) return;
        isMoving = true;

        let x = e.clientX - mapRect.left;
        let y = e.clientY - mapRect.top;

        // Make sure token is not outside the map
        x = Math.max(x, tokenSize / 2);
        x = Math.min(x, mapRect.width - tokenSize / 2);

        y = Math.max(y, tokenSize / 2);
        y = Math.min(y, mapRect.height - tokenSize / 2);

        // Calculate the distance between the click and the token's current position
        const dx = x - position.x;
        const dy = y - position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate the transition duration based on the distance
        duration = (distance / speed) * 1000;

        // To allow click when the token as reach 80% of the destination
        const durationBuffer = duration * 0.8;

        position = { x, y };

        animateClick(position);

        // prevent click if is moving
        setTimeout(() => {
            isMoving = false;
        }, durationBuffer);
    }

    function calcMapPosition(position: Position, map: Position) {
        let x = position.x;
        let y = position.y;

        // Prevent grid from moving outside the map
        x = Math.max(x, map.x);
        x = Math.min(x, mapWidth - map.x);

        y = Math.max(y, map.y);
        y = Math.min(y, mapHeight - map.y);

        return {
            x: x - map.x,
            y: y - map.y,
        };
    }

    function animateClick(position: Position) {
        const rippleRect = rippleRef.getBoundingClientRect();

        const ripplePosition = {
            x: position.x - rippleRect.width / 2,
            y: position.y - rippleRect.height / 2,
        };

        rippleStyle = `left: ${ripplePosition.x}px; top: ${ripplePosition.y}px; animation: ripple-effect .3s  linear;`;

        // Reset ripple animation
        setTimeout(() => {
            rippleStyle = '';
        }, 300);
    }

</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#if windowHeight > 0 && windowWidth > 0}
<div
    class="bg-slate-600 absolute transition-all"
    style="transform: translate(-{mapPosition.x}px, -{mapPosition.y}px); transition-duration: {duration}ms;"
>
    <div class="relative" style="width: {mapWidth}px; height: {mapHeight}px">
        <button
            bind:this={mapRef}
            on:click={getClickPosition}
            class={`rounded shadow-md bg-white bg-grid w-[99%] h-[99%] bg-repeat absolute-centered`}
        >
            <AvatarToken {position} {tokenSize} {duration} />
            <div
                bind:this={rippleRef}
                class={`w-[5px] h-[5px] bg-transparent absolute rounded-full border border-blue-500/50`}
                style={rippleStyle}
            />
        </button>
    </div>
</div>
{/if}
