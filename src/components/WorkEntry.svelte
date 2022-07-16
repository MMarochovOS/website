<script>
    export let image;
    export let title;
    export let description;
</script>

<div id="card">
    <div id="im-container">
    <img id="headshot" src={image} alt={title +" image"}/>
    </div>
    <h3>{title}</h3>
    <p>{description} </p>
</div>

<style>
    #card {
        background:
      radial-gradient(circle at 6.7% 95%,
        rgba(150, 116, 252, 0.454),
        rgba(0,0,255,0) 70.71%),
      radial-gradient(circle at 75% 75%,
        rgba(116, 252, 227, 0.249),
        rgba(0,255,0,0) 70.71%) rgba(114, 109, 109, 0.167);
        width: 300px;
        height: 440px;
        border-radius: 10px;
        box-shadow: 0 0 6px rgb(0 0 0 / 40%);
    }
    /* h4 {
        font-style: italic;
        color: grey;
        text-align: center;
    } */
    h3 {
        text-align: center;
        padding: 0px 40px 0px 40px;
    }

    #im-container {
        height: 201px;
        width: 93.5%;
        contain: content;
        display: flex;
        background-color: rgb(29, 30, 32);
        margin: 10px;
        border-radius: 10px;
    }
    
    #headshot {
        border-radius: 10px;
        margin: auto;
        width: 100%;
        display: block;
    }
    p {padding: 0px 10px 0px 10px;
        font-size: 14px;
        text-align: left;
    }
</style>