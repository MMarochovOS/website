<!-- Work.svelte -->
<script>

import WorkEntry from "../components/WorkEntry.svelte";

let team_members = [
        {
            title: "SEE_ICE",
            image: "images/SEE_ICE.png",
            description: "During my masters I published a paper about using deep learning to classify satellite imagery containing marine-terminating glaciers in Greenland."
        },
        {
            title: "OS Machine Learning Model Hub",
            image: "images/model_hub_logo.png",
            description: "I worked with the VisionAI and Research Teams at OS to create a model hub to facilitate ethical consideration, increase transparency and accountability, and reduce duplication of effort."
        },
        {
            title: "Placeholder",
            image: "http://www.fillmurray.com/g/200/300",
            description: "This is a placeholder card for work I've done."
        }           
    ]
</script>

<div class="meet-the-team">
    <h2>My Work</h2>
    <div class="grid-container">
        {#each team_members as m}
        <WorkEntry title={m.title} description={m.description} image={m.image}/>
        {/each}


    </div>
</div>

<style>
    .meet-the-team {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .grid-container {
        display: inline-grid;
        gap: 2em 2em;
        grid-template-columns: 31% 31% 31%;
        grid-template-rows: auto auto auto;
        justify-items: center;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    /*  GO FULL WIDTH BELOW 480 PIXELS */
    @media only screen and (max-width: 950px) {
        .grid-container { grid-template-columns: 100%; grid-template-rows: repeat(5, auto); gap: 1em 0px;}
    }
</style>

