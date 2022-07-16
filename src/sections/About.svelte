<!-- About.svelte -->

<script>
    import NavBar from "../components/NavBar.svelte"
    import Name from "../components/Name.svelte"
    import Scroll from "../components/Scroll.svelte"
    import ScrollArrow from "../components/ScrollArrow.svelte"
    import Experience from "../sections/Experience.svelte"
    import Work from "../sections/Work.svelte"

</script>



<div>
    <NavBar/>
    <div id=page-one>
    <Name/>
    <p id="about">I'm Mel Marochov, a Graduate Data Scientist in the Rapid Prototyping Team at Ordnance Survey. I like skateboarding, wild swimming, and making stuff! I've been learning some pretty cool things from some pretty cool people, from a wee bit of Python to a fair amount of web development... but mainly just an outrageous number of keyboard shortcuts.</p>
    </div>
    <ScrollArrow/>
</div>

<section id="experience">
    <Experience/>
</section>

<section id="work">
    <Work/>
</section>

<style>

    div {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }


    #page-one {
        margin-left: 6em;
    }


#about {
    width: 70%;
    display: inline-block;
    text-align: left;
    font-size: 20px;
    font-family: "Lucida Sans Typewriter";
}
</style>