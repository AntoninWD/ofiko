<script lang="ts">
    import Asset from '../assets/Asset.svelte';
    import KitchenTableGroup from '../template/KitchenTableGroup.svelte';
    export let roomName: string;
    const assets = [
        {
            name: 'kitchen-counter',
            position: {
                top: 24,
                left: 400,
            },
        },
        {
            name: 'plant',
            position: {
                top: 40,
                left: 290,
            },
            rotate: -90,
            scale: 0.7,
        },
        {
            name: 'sofa',
            position: {
                top: 180,
                left: 225,
            },
            rotate: -90,
        },
        {
            name: 'plant',
            position: {
                top: 340,
                left: 290,
            },
            rotate: -90,
            scale: 0.7,
        },
        {
            name: 'tv',
            position: {
                top: 75,
                left: 24,
            },
            rotate: 180,
        },
        {
            name: 'kitchen-table',
            position: {
                top: 24,
                right: 24,
            },
        },
        {
            name: 'kitchen-chair',
            position: {
                top: 90,
                right: 250,
            },
            rotate: -90,
        },
        {
            name: 'kitchen-chair',
            id: 1,
            position: {
                top: 250,
                right: 100,
            },
            rotate: 180,
        },
    ];
</script>

{#each assets as asset, i}
    <Asset {roomName} {...asset} id={i} />
{/each}

<KitchenTableGroup
    id={1}
    position={{
        bottom: 24,
        left: 600,
    }}
/>
<KitchenTableGroup
    id={2}
    position={{
        bottom: 24,
        left: 150,
    }}
/>
