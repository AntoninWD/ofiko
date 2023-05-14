<script lang="ts">
    import { TOKEN_SIZE } from '../../../configs/map';
    import { tokenPosition, updateTokenPosition} from '../../../stores/map'
    import type { Position, Coordinates } from '../types';
    export let position: Position;
    export let duration: number;

    $: updateTokenPosition(position);
    let tokenLocation: Coordinates;

    tokenPosition.subscribe((value) => {
        tokenLocation = value;
    });

</script>

<div
    class="shadow-md border-4 border-blue-600 rounded-full absolute transition-all"
    style="top: {tokenLocation.y[0]}px; left: {tokenLocation.x[0]}px ; width: {TOKEN_SIZE}px; height: {TOKEN_SIZE}px; transition-duration: {duration}ms;"
    ><img
        class="no_highlights w-full h-full rounded-full"
        src="/images/profile.jpg"
        alt="Codepiece"
    />
</div>
