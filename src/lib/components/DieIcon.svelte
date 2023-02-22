<script>
	export let number;

	const icons = {
		0: [],
		1: ['10,12'],
		2: ['4,6', '16,18'],
		3:['4,6', '10,12', '16,18'],
		4:['4,6', '16,18', '4,18', '16,6'],
		5:['4,6', '16,18', '4,18', '16,6', '10,12'],
		6:['4,6', '16,18', '4,18', '16,6', '4,12', '16,12'],
	};
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="inline-block w-8 h-8 mr-1">
	<path d="m1,1 h22v22h-22z" stroke="currentColor" stroke-width="2" fill="#fff" />
	{#each icons[number] as dot}
		<path d={'m' + dot + 'a 2,2 0 1,0 4,0a 2,2 0 1,0 -4,0'} fill="currentColor" />
	{/each}
</svg>
