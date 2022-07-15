<!-- App.svelte -->

<script>
	// export let name;
	import Router from "svelte-spa-router";
  	import { routes } from "./routes";
</script>

<main>
	<Router {routes} />
</main>

<style>
	:global(body) {
		background-color: beige;
		color: #000000;
		transition: background-color 0.8s
	}
	:global(body.dark-mode) {
		background-color: #204462;
		color: #d7e3f5;
	}

	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>