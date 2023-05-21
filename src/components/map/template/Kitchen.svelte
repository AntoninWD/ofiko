<script lang="ts">
    import Asset from '../assets/Asset.svelte';
    export let roomName: string;
</script>

<Asset {roomName} name="kitchen" position={
    {
        top: 24,
        left: 24,
    }
}/>
