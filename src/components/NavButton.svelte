<!-- NavButton.svelte -->

<script>
    // Props
    export let href;

    // Init    
    function scrollIntoView({ currentTarget }) {
      const el = document.querySelector(currentTarget.getAttribute('href'));
      if (!el) return;
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
</script>
  
<a {href} on:click|preventDefault={scrollIntoView}>
  <slot/>
</a>

<style>
  a {
    padding: 20px 40px 12px 0px;
    width: fit-content;
    border-radius: 3px;
    width: fit-content;
    color: black;
    font-family: 'Permanent Marker', cursive;
    font-size: 1.5rem;
  }

  a:hover {
    text-decoration: underline;
    text-decoration-color: rgb(149, 116, 252, .5);
    text-decoration-thickness:5px;
  }

  :global(body.dark-mode) a {
  color: #d7e3f5;
  }

  :global(body.dark-mode) a:hover {
  text-decoration: underline;
    text-decoration-color: white;
    text-decoration-thickness:5px;
  }
</style>
