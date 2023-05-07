<script>
    import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '../../components/layouts/Header.svelte';
    
</script>


<AppShell>
	<svelte:fragment slot="header">
        <Header />
    </svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>