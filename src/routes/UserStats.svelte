<script>
    export let params = {}
    import { getAllRepos, getUser, getUserStats } from '../utils/gh_utils';
    import Profile from '../components/Profile.svelte';
    import TopRepos from '../components/TopRepos.svelte';
    import { pop } from 'svelte-spa-router';
    const username = params.username;    
    /*let user = getUser(username);
    let repos = getAllRepos(username);  */
    let res = getUserStats(username);
    // res.then((res2)=>console.log(res2));
</script>
<main>
    <div class="bg"></div>
    <button on:click={pop} class="back-button button is-primary">
        Back
    </button>
    {#await res}
        <div class="loading">
            <progress class="progress is-small is-primary" max="100">15%</progress>
        </div>
    {:then {user,repos,headers}}
        <div class="limits has-text-light has-text-weight-bold subtitle">
            {headers['x-ratelimit-remaining']} / {headers["x-ratelimit-limit"]}  <br />
           <span class="small">
               REQUESTS LEFT
           </span>
        </div>
        <Profile user={user} />
        <TopRepos repos={repos} />
    {/await}
</main>

<style>
    .bg {
        z-index: -9999;
        position: absolute;
        height: 600px;
        width: 100%;
        background-color: #222222;
        top:0;
        right: 0;
    }
    .limits {
        position: absolute;
        left: 20px;
        top: 70px;
        text-align: center;
    }
    .limits .small {
        font-size: 12px;
    }
    .back-button {
        position: absolute;
        left: 20px;
        top: 20px;
    }
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: whitesmoke;
    }
    .loading progress {
        width: 200px;
    }
</style>