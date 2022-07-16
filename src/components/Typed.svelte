<!-- Typed.svelte -->

<div class="typed-element" bind:this={typedElement}>
    <slot></slot>
</div>

<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12">
  import Typed from 'typed.js'
  
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  let typedObj = null;
  let typedElement = null;
  function throwError(message) {
      throw new TypeError(message)
  }
  function initTypedJS() {
      
      const $typed = typedElement.querySelector('.typing')
      if ($$slots.default == undefined) {
          throwError(`Just one child element allowed inside  component.`)
      } else if ($$slots.default == true) {
          typedObj = new Typed($typed, $$props)
      }
  }
  onMount(() => {initTypedJS()});
  onDestroy(() => {typedObj.destroy()});
</script>

<style>
  .typed-element {
      display: flex;
      align-items: center;
      margin-left: 4px;
  }
  :global(.typed-element .typed-cursor) {
      opacity: 1;
      font-size:25px;
      animation: typedjsBlink 0.7s infinite;
  }
  @keyframes typedjsBlink {
    0% { opacity:1; }
    50% { opacity:0; }
    100% { opacity:1; }
  }
</style>