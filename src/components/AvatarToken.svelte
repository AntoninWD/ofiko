<script lang="ts">
    import { TOKEN_SIZE } from '../configs/map';
    export let position: { x: number; y: number };
    export let duration: number;

    $: tokenPosition = {
        x: position.x - TOKEN_SIZE / 2,
        y: position.y - TOKEN_SIZE / 2,
    };
</script>

<div
    class="border-4 border-blue-600 rounded-full absolute transition-all"
    style="top: {tokenPosition.y}px; left: {tokenPosition.x}px ; width: {TOKEN_SIZE}px; height: {TOKEN_SIZE}px; transition-duration: {duration}ms;"
    ><img class="w-full h-full rounded-full" src="/images/profile.jpg" alt="Codepiece" />
</div>
