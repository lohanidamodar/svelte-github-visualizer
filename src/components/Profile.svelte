<script>
    export let user;

</script>

<style>
    .profile {
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
        border: 0.5rem solid #92122D;
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

<header class="profile pt-7">
    <div class="avatar">
        <img src={user.avatar_url} alt="avatar" />
    </div>
    <h1 class="title has-text-white mt-7">{user.name}</h1>
    <p class="subtitle has-text-white"><a class="has-text-white" href={user.html_url}>{user.login}</a></p>
    <div class="subtitle has-text-white">
        <p>{user.bio}</p>
        <div class="pt-2">
            <svg aria-hidden="true" class="octicon" height="16" role="img" viewBox="0 0 14 16" width="14" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M9 4V3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v1H1c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H9zM6 3h2v1H6V3zm7 6H8v1H6V9H1V5h1v3h10V5h1v4z"></path></svg> {user.company} <span class="pl-4"></span> 
            <svg aria-hidden="true" class="octicon" height="16" role="img" viewBox="0 0 12 16" width="12" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg> {user.location} <span class="pl-4"></span>
            <svg aria-hidden="true" class="octicon" height="16" role="img" viewBox="0 0 14 16" width="14" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M13 2h-1v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H6v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V5h11v9zM5 3H4V1h1v2zm6 0h-1V1h1v2zM6 7H5V6h1v1zm2 0H7V6h1v1zm2 0H9V6h1v1zm2 0h-1V6h1v1zM4 9H3V8h1v1zm2 0H5V8h1v1zm2 0H7V8h1v1zm2 0H9V8h1v1zm2 0h-1V8h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1zm2 0h-1v-1h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1z"></path></svg> Joined {new Date(user.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
        </div>
    </div>
    <div class="cards pt-4">
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