<script>
    import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '../../components/layout/Header.svelte';

</script>

<AppShell slotPageContent='overflow-hidden'>
    <svelte:fragment slot="header">
        <Header />
    </svelte:fragment>
    <!-- Router Slot -->
    <slot />
   
</AppShell>
