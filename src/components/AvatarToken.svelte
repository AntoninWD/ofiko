<script lang="ts">
    export let position: { x: number; y: number };
    export let tokenSize: number;
    export let duration: number;

    $: tokenPosition = {
        x: position.x - tokenSize / 2,
        y: position.y - tokenSize / 2,
    };

</script>

<div
    class="border-4 border-blue-600 rounded-full absolute transition-all"
    style="top: {tokenPosition.y}px; left: {tokenPosition.x}px ; width: {tokenSize}px; height: {tokenSize}px; transition-duration: {duration}ms;"
    ><img
        class="w-full h-full rounded-full"
        src="/images/profile.jpg"
        alt="Codepiece"
    />
</div>
