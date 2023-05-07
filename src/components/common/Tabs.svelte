<script lang="ts">
	import { page } from '$app/stores';
	export let items: {
		label: string;
		href: string;
	}[];
</script>

<div class="text-sm text-center">
	<ul class="flex flex-wrap -mb-px">
		{#each items as { label, href }}
			<li class="mr-2 transition-all">
				<a
					{href}
					class={`transition-all pt-2 pb-4 mx-4 rounded-t-lg border-b-2 flex hover:text-white ${
						href === $page.url.pathname
							? 'text-white  border-blue-600'
							: 'border-transparent text-gray-400'
					}`}
					aria-current="page"
				>
					{label}
					</a
				>
			</li>
		{/each}
	</ul>
</div>
