<!-- ExperienceEntry.svelte -->

<script>
    export let org;
    export let role;
    export let time;
    export let description;
</script>
    <h3 id="org">{org}</h3>
<div id="container">

    <div id="sub-info">
        <h3 id="role">{role}</h3>
        <h4 id="time">{time}</h4>
    </div>

    <div id="description-container">
        <p id="description">{description}</p>
    </div>
</div>


<style>
    
    #container {
        background:
      radial-gradient(circle at 6.7% 95%,
        rgba(150, 116, 252, 0.454),
        rgba(0,0,255,0) 70.71%),
      radial-gradient(circle at 75% 75%,
        rgba(116, 252, 227, 0.249),
        rgba(0,255,0,0) 70.71%) rgba(114, 109, 109, 0.167);
        border-radius: 10px;
        box-shadow: 0 0 6px rgb(0 0 0 / 40%);
    }
    #org {
        font-size: 1.5rem;
        text-align: left;
        margin: 0px;
        margin-bottom: .5em;
    }
    
    #sub-info {
        display: flex;
        justify-content: space-between;
        padding: 0px 10px 0px 10px;
        }

    #description, #role, #time {
        margin: 0.5rem 0rem 0.5rem 0rem;
    }

    #description-container {
        /* background:
      radial-gradient(circle at 6.7% 95%,
        rgba(150, 116, 252, 0.247),
        rgba(0,0,255,0) 70.71%),
      radial-gradient(circle at 75% 75%,
        rgba(116, 252, 227, 0.107),
        rgba(0,255,0,0) 70.71%) rgba(255, 255, 255, 0.317); */
        border-radius: 5px;
        padding: 10px;
        text-align: left;
    }
    :global(body.dark-mode) #description-container {
        background-color: rgba(174, 88, 255, 0.201);
        border-radius: 5px;
    }
</style>