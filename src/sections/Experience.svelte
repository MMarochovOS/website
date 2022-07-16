<!-- Experience.svelte -->

<script>
import { listen } from "svelte/internal";

    import { fade, scale } from "svelte/transition";
    import ExperienceEntry from "../components/ExperienceEntry.svelte";

    let work = [
        {
            org: "Ordnance Survey",
            role: "Graduate Data Scientist",
            time: "April 2022 - present",
            description: "I've been doing some stuff, like I did this whole bunch of stuff by using stuff and stuff and applying it to stuff. Now I'm really good at stuff. Hire me and I'll do stuff."
        },        
        {
            org: "",
            role: "Graduate Research Scientist",
            time: "September 2021 - March 2022",
            description: "I did some other stuff as well"
        }
    ]
    let education = [
        {
            org: "Durham University",
            role: "M. Sc. (by research) Geography",
            time: "2019-2021",
            description: "I've been doing some stuff, like I did this whole bunch of stuff by using stuff and stuff and applying it to stuff. Now I'm really good at stuff. Hire me and I'll do stuff."
        },        
        {
            org: "",
            role: "B. Sc. Geography",
            time: "2016 - 2019",
            description: "I did some other stuff as well"
        }
    ]
</script>

<div id="experience" in:scale>
    <h2>My Experience</h2>
    <section id="outer">
        <section id="inner">
        {#each work as e}
        <div id="entry">
        <ExperienceEntry org={e.org} role={e.role} time={e.time} description={e.description}/>
        </div>
        {/each}
    </section>
    </section>

    <section id="outer">
        <section id="inner">
        {#each education as e}
        <div id="entry">
        <ExperienceEntry org={e.org} role={e.role} time={e.time} description={e.description}/>
        </div>
        {/each}
    </section>
    </section>
     
</div>

<style>

    /* #outer {
        background:
      radial-gradient(circle at 6.7% 95%,
        rgba(150, 116, 252, 0.454),
        rgba(0,0,255,0) 70.71%),
      radial-gradient(circle at 75% 75%,
        rgba(116, 252, 227, 0.249),
        rgba(0,255,0,0) 70.71%) rgba(114, 109, 109, 0.167);
        border-radius: 5px;
        padding: 5px;
        margin: 10px;
    }

    #inner {
        background: rgba(255, 255, 255, 0.183);
        border-radius: 5px;
        padding: 5px;
    } */
    #experience  {
        width: 50%;
        position: relative;
        display: inline-block;
        margin-bottom: 5em;
        }

    #entry {
        margin: 2em;
    }

</style>


