<!-- NavBar.svelte -->

<script>
    // Imports
    import NavButton from "../components/NavButton.svelte"
</script>

<div id="nav">
    <NavButton href="#experience">experience</NavButton>
    <NavButton href="#work">work</NavButton>
</div>

<style>
    #nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        flex-wrap: nowrap; 
    }
</style>
