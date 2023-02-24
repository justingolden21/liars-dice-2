<script>
	/**
	 * Used for 404, 5xx, and other errors
	 */
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Error | Liar's Dice</title>
</svelte:head>

<div class="container mx-auto sm:p-8">
	<h1 class="h1">Error {$page.status} &mdash; {$page.error.message}</h1>

	<a href="/" class="block button -primary">Go home</a>
</div>
