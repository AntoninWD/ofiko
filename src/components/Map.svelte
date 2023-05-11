<script lang="ts">
    import AvatarToken from './AvatarToken.svelte';
    import { afterUpdate } from 'svelte';
    import { onMount } from 'svelte';

    let mapRef: HTMLButtonElement;

    // TODO: place this in a config file
    const tokenSize = 48;
    const mapWidth = 5000;
    const mapHeight = 5000;
    const headerHeight = 56;
    const defaultPosition = { x: mapWidth / 2, y: mapHeight / 2 };
    // ------------------------------
    let position = defaultPosition;

    // get window size
    let windowWidth = 0;
    let windowHeight = 0;

    onMount(() => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight - headerHeight;
    });

    function getClickPosition(e: MouseEvent) {
        const mapRect = mapRef.getBoundingClientRect();

        let x = e.clientX - mapRect.left;
        let y = e.clientY - mapRect.top;

        // Make sure token is not outside the map
        x = Math.max(x, tokenSize / 2);
        x = Math.min(x, mapRect.width - tokenSize / 2);

        y = Math.max(y, tokenSize / 2);
        y = Math.min(y, mapRect.height - tokenSize / 2);

        position = { x, y };
    }

    $: mapCenter = {
        x: windowWidth / 2,
        y: windowHeight / 2,
    };

    $: mapPosition = calcMapPosition(position) || {
        x: position.x - mapCenter.x,
        y: position.y - mapCenter.y,
    };

    function calcMapPosition(position: { x: number; y: number }) {
        let x = position.x;
        let y = position.y;

        // Prevent grid from moving outside the map
        x = Math.max(x, mapCenter.x);
        x = Math.min(x, mapWidth - mapCenter.x);

        y = Math.max(y, mapCenter.y);
        y = Math.min(y, mapHeight - mapCenter.y);

        return {
            x: x - mapCenter.x,
            y: y - mapCenter.y,
        };
    }
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div
    class="bg-slate-600 absolute transition-all duration-500"
    style="transform: translate(-{mapPosition.x}px, {-mapPosition.y}px)"
>
    <div class="relative" style="width: {mapWidth}px; height: {mapHeight}px">
        <button
            bind:this={mapRef}
            on:click={getClickPosition}
            class={`rounded shadow-md bg-white bg-grid w-[99%] h-[99%] bg-repeat absolute-centered`}
        >
            <AvatarToken {position} {tokenSize} />
        </button>
    </div>
</div>
