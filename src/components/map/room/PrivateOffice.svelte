<script lang="ts">
    import Asset from '../assets/Asset.svelte';
    export let roomName: string;

    const assets = [
        {
            name: 'office',
            position: {
                bottom: 24,
                left: 200,
            },
        },
        {
            name: 'office-chair',
            position: {
                bottom: 60,
                left: 100,
            },
        },
        {
            name: 'chair',
            position: {
                bottom: 60,
                left: 300,
            },
            rotate: 90,
        },
        {
            name: 'plant',
            position: {
                top: 30,
                left: 30,
            },
            rotate: 90,
            scale: 0.7,
        },
        {
            name: 'library',
            position: {
                top: 24,
                left: 120,
            },
            rotate: 180,
        },
        {
            name: 'library',
            position: {
                bottom: 80,
                right: -30,
            },
            rotate: -90,
        },
        {
            name: 'plant',
            position: {
                bottom: 200,
                right: 20,
            },
            rotate: 90,
            scale: 0.7,
        },
    ];
</script>

{#each assets as asset, i}
    <Asset {roomName} {...asset} id={i} />
{/each}
