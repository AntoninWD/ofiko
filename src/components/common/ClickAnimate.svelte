<script lang="ts">
    import type { Position} from '../map/types';
    export let style = '';
    export let triggerClick: boolean;
    export let position: Position;

    let ref: HTMLDivElement;

    $: if (triggerClick) {
        animateClick(position);
    }

    function animateClick(position: Position) {
        const rippleRect = ref.getBoundingClientRect();

        const ripplePosition = {
            x: position.x - rippleRect.width / 2,
            y: position.y - rippleRect.height / 2,
        };

        style = `left: ${ripplePosition.x}px; top: ${ripplePosition.y}px; animation: ripple-effect .3s  linear;`;

        // Reset animation
        setTimeout(() => {
            style = '';
        }, 300);
    }

</script>

<div
    bind:this={ref}
    class={`w-[5px] h-[5px] bg-transparent absolute rounded-full border border-blue-500/50 ${!style && 'hidden'}`}
    {style}
/>
