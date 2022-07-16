<!-- Name.svelte -->

<script>
    import Typed from "../components/Typed.svelte"
    import Mode from "../components/Mode.svelte"


</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nixie+One&family=Open+Sans&family=Permanent+Marker&display=swap" rel="stylesheet">
<div id="container">
  <p class="subheading">It's-a me,</p>
  <div id="name">
      <h1 class="neon-text">Melio</h1>
      <Mode>Toggle</Mode>
    </div>
  <Typed strings={["I love web development,", "and data science,", "I'm not that great at them yet,", "but I'm trying my best :)", "oh and also, I think the Earth is flat."]} loop=true typeSpeed=9 startDelay=1200 backSpeed=9 backDelay=2600 cursorChar= "|">
	<h2 class="typing"> </h2>
  </Typed>
</div>

<style>
  #container {
    text-align: left;
    font-family: "Lucida Sans Typewriter";
    line-height: 1;
    height: 270px;
    }


  #name {
    display: inline-flex;
    align-items: flex-end;
  }

  .subheading {
    font-family: 'Permanent Marker', cursive;
    font-size: 2.2em;
    font-weight: normal;
    margin: 10px;
    margin-left: 4px;
  }

  h1 {
    color: black;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: bold;
    margin: 0px;
    font-size: 6.2rem;
    
  }
  h2 {
    font-family: "Lucida Sans Typewriter";
    font-size: 1.5em;
  }

  :global(body.dark-mode) h1 {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: bold;
    margin: 0px;
    font-size: 6.2rem;
    color: #fff;
    animation: pulsate 0.11s ease-in-out infinite alternate;
	}

  @keyframes pulsate {
    100% {
      text-shadow: 
      0 0 4px #fff, 
      0 0 11px #fff, 
      0 0 19px #fff, 
      0 0 40px #f585c8,
      0 0 80px #f585c8, 
      0 0 90px #f585c8, 
      0 0 100px #f585c8, 
      0 0 150px #f585c8;
    }

    0% {
      text-shadow: 
      0 0 4px #fff, 
      0 0 10px #fff, 
      0 0 18px #fff, 
      0 0 38px #f585c8,
      0 0 73px #f585c8, 
      0 0 80px #f585c8, 
      0 0 94px #f585c8, 
      0 0 140px #f585c8;
    }
  }

</style>
