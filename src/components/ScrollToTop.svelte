<script>
    export let showOnPx = 150;
    let hidden = true;
  
    function goTop() {
      document.body.scrollIntoView({
        behavior: 'smooth'
      });
    }
  
    function scrollContainer() {
      return document.documentElement || document.body;
    }
  
    function handleOnScroll() {
      if (!scrollContainer()) {
        return;
      }
  
      if (scrollContainer().scrollTop > showOnPx) {
        hidden = false;
      } else {
        hidden = true;
      }
    }
  </script>
  
  <svelte:window on:scroll={handleOnScroll} />
  
  <div class="back-to-top" on:click={goTop} class:hidden><span class="material-symbols-outlined">
   arrow_circle_up</span></div>

      
  <style>

    span {
        font-size: 2.5rem;
    }

    .back-to-top {
      transition: opacity 0.5s, visibility 0.5s;
      position: fixed;
      right: 20px;
      user-select: none;
      bottom: 20px;
      color: #478579;
    }
  
    .back-to-top.hidden {
      opacity: 0;
      visibility: hidden;
    }
  </style>
  