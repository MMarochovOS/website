<!-- About.svelte -->

<script>
    import NavBar from "../components/NavBar.svelte"
    import Name from "../components/Name.svelte"
    import Scroll from "../components/Scroll.svelte"
    import ScrollArrow from "../components/ScrollArrow.svelte"
    import Experience from "../pages/Experience.svelte"
    import Work from "../pages/Work.svelte"

</script>



<div>
    <NavBar/>
    <div id=page-one>
    <Name/>
    <p id="about">I'm Mel Marochov, a Graduate Data Scientist in the Rapid Prototyping Team at Ordnance Survey. Here's some more stuff about me because I'm a massive narcissist Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur quia fugit animi sed mollitia dicta repellat assumenda nobis, vero sit distinctio alias veritatis saepe reprehenderit commodi, dolores debitis? Modi, sed!</p>
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
    font-family: 'Open Sans', sans-serif;
}
</style>