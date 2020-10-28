<script>
import { getAllRepos, getUser } from './utils/gh_utils';
import Profile from './components/Profile.svelte';
import TopRepos from './components/TopRepos.svelte';
// import {repos} from './data/repos.js';
// import { user } from './data/user.js';
let username;
let timer;
let loading = true;
const debounce = v => {
		clearTimeout(timer);
		timer = setTimeout(() => {
      username = v;
      getData();
		}, 750);
}

let repos;
let user;
const getData = () => {
  console.log("function get data is called");
  if(username) {
    repos = getAllRepos(username);
    user = getUser(username);
    loading = false;
  }
}


</script>

<main>
  {#if !loading}
      <div class="searchbar">
        <input class="input" type="text" on:keyup={({ target: { value } }) => debounce(value)} />
      </div>
      {#await user}
        <div></div>
      {:then user} 
        <Profile user={user.data} />
        {#await repos}
          <div></div>
        {:then repos} 
        <TopRepos repos={repos} />
        {/await}
      {/await}
    {:else}
      <div class="initial">
        <div class="search">
          <h2 class="title">Search Github by Username</h2>
          <input autofocus class="input" type="text" on:keyup={({ target: { value } }) => debounce(value)} />
        </div>
      </div>
    {/if}
		
</main>

<style>
  .searchbar {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .initial {
    background-color: whitesmoke;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .initial .search {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 300px;
  }
</style>