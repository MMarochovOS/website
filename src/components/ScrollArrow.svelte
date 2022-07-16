<!-- ScrollArrow.svelte -->
<p>scroll</p>
<svg version="1.1" id="svg-arrow-down" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 35"  xml:space="preserve">
  <polygon class="arrow" points="20.58,11.584 12.004,20.158 12.004,0 9.996,0 9.996,20.158 1.42,11.584 0,13.004 11,24
        22,13.004 "></polygon>
</svg>

<style>

  p {
    font-family: 'Permanent Marker', cursive;
    font-size: 1.2rem;
  }
  
  svg {
    width: 25px;
    display: block;
    align-self: center;
    margin: 0px 0px 50px 0px;
  }

  .arrow {
    animation: scroll .35s ease-in alternate infinite;
  }

  :global(body.dark-mode) .arrow {
    fill: #d7e3f5;
  }
  
  @keyframes scroll {
  0% {
  transform: translateY(0);
  }
  100% {
  transform: translateY(10px);
  }
  }
</style>