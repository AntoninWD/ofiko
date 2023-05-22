<script lang="ts">
    import Asset from '../assets/Asset.svelte';
    export let id: number;
    export let position: { top?: number; left?: number; bottom?: number; right?: number };
    const roomName = `kitchen-table-group-${id}`;

</script>

<div
    class="absolute"
    style="top: {position.top}px; left: {position.left}px; bottom: {position.bottom}px; right: {position.right}px"
>
    <div class="relative w-[360px] h-[250px]">
        <Asset
            {roomName}
            name="kitchen-table"
            position={{
                bottom: 24,
                centered: true,
            }}
        />

        <Asset
            {roomName}
            name="kitchen-chair"
            position={{
                top: 50,
                left: 5,
            }}
            rotate={-90}
        />
         <Asset
            {roomName}
            id={1}
            name="kitchen-chair"
            position={{
                top: 135,
                left: 5,
            }}
            rotate={-90}
        />
        <Asset
            {roomName}
            name="kitchen-chair"
            id={2}
            position={{
                top: 50,
                right: 5,
            }}
            rotate={90}
        />
        <Asset
            {roomName}
            name="kitchen-chair"
            id={3}
            position={{
                top: 135,
                right: 5,
            }}
            rotate={90}
        /> 
    </div>
</div>
