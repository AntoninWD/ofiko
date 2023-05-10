<script lang="ts">
    import Tabs from '../common/Tabs.svelte';

    let items = [
        {
            label: 'Home',
            href: '/app',
        },
        {
            label: 'Notifications',
            href: '/app/notifications',
        },
        {
            label: 'Settings',
            href: '/app/settings',
        },
    ];
</script>

<nav class="shadow-md bg-slate-800 flex items-center px-2 pt-2">
    <div class="flex items-center border-r border-gray-500 pr-6 mr-4 mb-2 cursor-pointer">
        <img
            class="w-10 h-10 rounded-full border border-gray-700 mr-3"
            src="https://picsum.photos/200/300"
            alt="Codepiece"
        />
        <span class="transition-all text-sm text-gray-200">Antonin <br /> Arsenault</span>
    </div>
    <Tabs {items} />
</nav>
