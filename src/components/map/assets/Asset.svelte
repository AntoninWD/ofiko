<script lang="ts">
    import { onMount } from 'svelte';
    import { updateAssetsCoordinates } from '../../../stores/map';
    import { createLoadObserver } from '../../../utils/general';
    let ref: HTMLImageElement;
    export let name: string;
    export let roomName: string;
    export let position: { top?: number; left?: number; bottom?: number; right?: number };

    const onload = createLoadObserver(() => {
        updateAssetsCoordinates(`${roomName}-${name}-assets`, ref);
    })

</script>

<div
    class="absolute w-fit h-fit"
    style={`${position?.top ? `top: ${position.top}px;` : ''} ${
        position?.left ? `left: ${position.left}px;` : ''
    } ${position?.bottom ? `bottom: ${position.bottom}px;` : ''} ${
        position?.right ? `right: ${position.right}px;` : ''
    }`}
>
    <img use:onload bind:this={ref} class="min-w-[150%]" src={`/images/assets/${name}.png`} alt={name} />
</div>
