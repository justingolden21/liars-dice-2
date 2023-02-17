<script>
	// TODO: split into game.js
	// TODO: local store
	// TODO: store game history
	// TODO: fullscreen, contact, about

	import NewGameButton from '$lib/components/NewGameButton.svelte';
</script>

<div class="container mx-auto p-8">
	<h1 class="text-3xl lg:text-5xl font-light text-center">Liar's Dice</h1>
	<NewGameButton />

	<!-- ⚀ ⚁ ⚂ ⚃ ⚄ ⚅ -->
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}

	:global(::selection) {
		background-color: theme(colors.blue.700);
		color: theme(colors.white);
	}
	:global(*:focus) {
		@apply ring ring-blue-300 outline-none;
	}
</style>
