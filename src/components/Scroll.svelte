<!-- Scroll.svelte -->

	<section class="example">	
	  <span class="scroll-icon">
		<span class="scroll-icon__wheel-outer">
			<span class="scroll-icon__wheel-inner"></span>
		</span>
		<!-- <span class="scroll-icon__dot"></span> -->
	  </span>
	</section>

<style>

@keyframes scroll_2 {
	0%   { transform: translateY(0); }
  25%  { transform: translateY(-0.6em); }
  50%  { transform: translateY(0); }
  75%  { transform: translateY(0.6em); }
  100% { transform: translateY(0); }
  /* 0%   { transform: translateY(0); opacity: 1; }
  25%  { opacity: 1; }
  75%  { transform: translateY(.75em); opacity: 0; }
  100% { transform: translateY(0); opacity: 0; } */
}


.scroll-icon__wheel-outer {
  display: block;
  position: absolute;
  left: 50%;
  top: .5em;
  height: 0.6em;
  width: .29em;
  margin-left: -.15em;
  border-radius: .4em;
  overflow: hidden;
}

.scroll-icon__wheel-inner {
  display: block;
  height: 100%;
  width: 100%;
  border-radius: inherit;
  background: #000;
  animation: scroll_2 2.75s ease-in-out infinite;
}

/* 
.scroll-icon__dot {
  display: block;
  position: absolute;
  left: 50%;
  background: #fff;
  height: .45em;
  width: .45em;
  top: .6em;
  margin-left: -.25em;
  border-radius: 50%;
  transform-origin: top center;
  backface-visibility: hidden;
  animation: scroll_2 2s ease-out infinite;
} */

.scroll-icon {
  display: block;
  position: relative;
  height: 2.3em;
  width: 1.3em;
  border: .2em solid #000;
  border-radius: 1em;
  margin: 5em;
}


.example {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

:global(body.dark-mode) .scroll-icon {
	border: .20em solid #d7e3f5;
}

:global(body.dark-mode) .scroll-icon__wheel-inner {
	background: #d7e3f5;
}

/* p {
	margin: 0.5em;
    font-family: 'Nixie One';
    font-weight: bold;
} */
</style>