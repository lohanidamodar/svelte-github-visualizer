<script>
import GithubIcon from "../components/GithubIcon.svelte";

    let username;
    const enterPressed = event => {
        if(event.keyCode == 13) {
            window.location.href += "#/users/"+username
        }
    }
</script>  
    <main>
      
          <div class="initial">
            <div class="search">
              <GithubIcon />
              <h2 class="title pt-2">Search Github by Username</h2>
              <input autofocus class="input" bind:value={username} type="text" on:keyup={(event) => enterPressed(event)} />
            </div>
          </div>
            
    </main>
    
    <style>
      .initial {
        background-color: #92122Daa;
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
        align-items: center;
        justify-content: center;
        width: 300px;
      }
      .title {
        color: whitesmoke;
      }
    </style>