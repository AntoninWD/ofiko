<script lang="ts">
    import Asset from '../assets/Asset.svelte';
    export let id: number;
    export let position: { top?: number; left?: number; bottom?: number; right?: number };
    const roomName = `kitchen-table-group-${id}`;

    const assets = [
        {
            name: 'kitchen-table',
            position: {
                bottom: 24,
                centered: true,
            },
        },
        {
            name: 'kitchen-chair',
            position: {
                top: 25,
                left: 5,
            },
            rotate: -90,
        },
        {
            name: 'kitchen-chair',
            position: {
                top: 115,
                left: 5,
            },
            rotate: -90,
        },
        {
            name: 'kitchen-chair',
            position: {
                top: 25,
                right: 5,
            },
            rotate: 90,
        },
        {
            name: 'kitchen-chair',
            position: {
                top: 115,
                right: 5,
            },
            rotate: 90,
        },
    ];

</script>

<div
    class="absolute"
    style="top: {position.top}px; left: {position.left}px; bottom: {position.bottom}px; right: {position.right}px"
>
    <div class="relative w-[360px] h-[200px]">
        {#each assets as asset, i}
            <Asset {roomName} {...asset} id={i} />
        {/each}
    </div>
</div>
