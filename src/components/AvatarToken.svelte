<script lang="ts">
    export let position = { x: 0, y: 0 };
    export let tokenSize = 48;

    $: tokenPosition = {
        x: position.x - tokenSize / 2,
        y: position.y - tokenSize / 2,
    };

</script>

<div
    class="border-4 border-blue-600 rounded-full absolute transition-all duration-500"
    style="top: {tokenPosition.y}px; left: {tokenPosition.x}px ; width: {tokenSize}px; height: {tokenSize}px"
    ><img
        class="w-full h-full rounded-full"
        src="/images/profile.jpg"
        alt="Codepiece"
    />
</div>
