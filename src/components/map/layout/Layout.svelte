<script lang="ts">
    import Room from './Room.svelte';
    import { layoutConfig } from './layout';
    const { rooms } = layoutConfig;
</script>

{#each rooms as room}
    <Room {...room} />
{/each}
