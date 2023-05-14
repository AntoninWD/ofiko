<script lang="ts">
    import { onMount } from 'svelte';
    import { updateAssetsCoordinates } from '../../../stores/map';
    let ref: HTMLDivElement;
    export let name: string

    onMount(() => {
        updateAssetsCoordinates(name, ref);
    });

</script>

<div>
    <slot />
</div>
