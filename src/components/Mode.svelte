<!-- Mode.svelte -->

<script>
let darkMode = false;
function toggle() {
    darkMode = !darkMode;
	window.document.body.classList.toggle('dark-mode')
}
</script>
<button on:click={toggle}>
	{#if darkMode }
    <img src="images/sun.svg" alt="sun for toggle light mode">
	{:else}
    <img src="images/moon.svg" alt="moon for toggle light mode">	
	{/if}
</button>
<style>
	button {
		background-color: transparent;
		border: none;
        padding: none;
		border-radius: 4px;
		text-transform: uppercase;
		
	}
	:global(body.dark-mode) button {
		background-color: transparent;
	}
</style>