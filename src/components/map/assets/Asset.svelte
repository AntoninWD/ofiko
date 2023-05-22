<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    import { updateAssetsCoordinates } from '../../../stores/map';
    import { createLoadObserver } from '../../../utils/general';
    let ref: HTMLImageElement;
    export let name: string;
    export let roomName: string;
    export let position: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
        centered?: boolean;
    };
    export let id: number = 0;
    export let rotate: number = 0;

    const onload = createLoadObserver(() => {
        if (ref === undefined) return;

        updateAssetsCoordinates(`${roomName}-${name}-assets-${id}`, ref);
    });
</script>

<img
    use:onload
    bind:this={ref}
    class="absolute"
    src={`/images/assets/${name}.png`}
    alt={name}
    style={`${position?.top ? `top: ${position.top}px;` : ''} ${
        position?.left ? `left: ${position.left}px;` : ''
    } ${position?.bottom ? `bottom: ${position.bottom}px;` : ''} ${
        position?.right ? `right: ${position.right}px;` : ''
    }
    ${position?.centered ? 'top: 50%; left: 50%; transform: translate(-50%, -50%);' : ''}
    ${rotate ? `transform: rotate(${rotate}deg);` : ''}
    `}
/>
