<script lang="ts">
    import { updateAssetsCoordinates } from '../../../stores/map';
    import { createLoadObserver } from '../../../utils/general';
    let ref: HTMLDivElement;
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
    export let scale: number = 1;

    const onload = createLoadObserver(() => {
        if (ref === undefined) return;

        updateAssetsCoordinates(`${roomName}-${name}-assets-${id}`, ref);
    });
</script>


    <div
        class="absolute"
        bind:this={ref}
        style={`${position?.top ? `top: ${position.top}px;` : ''} ${
            position?.left ? `left: ${position.left}px;` : ''
        } ${position?.bottom ? `bottom: ${position.bottom}px;` : ''} ${
            position?.right ? `right: ${position.right}px;` : ''
        }     ${position?.centered ? 'top: 50%; left: 50%;' : ''}
        ${`transform: 
            rotate(${rotate}deg) 
            scale(${scale})`}
            ${position?.centered ? 'translate(-50%, -50%)' : ''}
        `}
    >
        <img class="w-full h-full" use:onload src={`/images/assets/${name}.png`} alt={name} />
    </div>

