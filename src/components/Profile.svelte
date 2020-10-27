<script>
    export let user;

</script>

<style>
    .profile {
        background-color: #222;
        color: white;
        text-align: center;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .avatar {
        border-radius: 100%;
        overflow: hidden;
        width: 150px;
        height: 150px;
        border: 0.5rem solid rgb(0, 112, 243);
        display: flex;
    }
    .cards {
        display: flex;
    }
    .card-content span {
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>

<header class="profile">
    <div class="avatar">
        <img src={user.avatar_url} alt="avatar" />
    </div>
    <h1 class="title has-text-white">{user.name}</h1>
    <p class="subtitle has-text-white">{user.bio}</p>
    <div class="cards">
        <div class="card">
            <div class="card-content">
                <span>{user.public_repos}</span>
                <p>{'Repositories'.toUpperCase()}</p>
            </div>
    
        </div>
        <div class="card ml-2">
            <div class="card-content">
                <span>{user.followers}</span>
                <p>{'Followers'.toUpperCase()}</p>
            </div>
    
        </div>
        <div class="card ml-2">
            <div class="card-content">
                <span>{user.following}</span>
                <p>{'Following'.toUpperCase()}</p>
            </div>
    
        </div>
    </div>
</header>