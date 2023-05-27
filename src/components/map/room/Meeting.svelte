<script lang="ts">
    import Asset from '../assets/Asset.svelte';
    export let roomName: string;

    const assets = [
        {
            name: 'meeting-table',
            position: {
                top: 350,
                left: 150,
            },
            rotate: 90,
        },
    ]
</script>


{#each assets as asset, i}
    <Asset {roomName} {...asset} id={i} />
{/each }