<script>
    import Chart from 'svelte-frappe-charts';
    export let repos;
    let myrepos = [];
    if(repos.length > 0) {
      myrepos = repos.filter((r) => !r.fork); 
    }
    let sortedByForks = [...myrepos].sort((a,b)=> {
      if(a.forks_count > b.forks_count) return -1;
      else if (a.forks_count < b.forks_count) return 1;
      return 0;
    });
    let top10Forked = sortedByForks.splice(0,9);
    let sortedByStars = [...myrepos].sort((a,b) => {
      if (a.stargazers_count > b.stargazers_count) return -1
      else if (a.stargazers_count < b.stargazers_count) return 1
      return 0
    });
    let top10Starred = sortedByStars.splice(0,9);
    let languages = {};
    let languageStars = {};
    for(const repo of sortedByStars) {
      languages[repo.language] = languages[repo.language] || 0;
      ++languages[repo.language];
      languageStars[repo.language] = languageStars[repo.language] || 0;
      languageStars[repo.language] += repo.stargazers_count;
    }
    if (languages["null"]) {
                languages.Others = languages["null"];
                delete languages["null"];
            }
    if (languageStars["null"]) {
                languageStars.Others = languageStars["null"];
                delete languageStars["null"];
            }

    let languageStarsChart = {
      labels: Object.keys(languageStars),
      datasets: [{
        values: Object.values(languageStars)
      }],
    }
    
    let chartData = {
      labels: Object.keys(languages),
      datasets: [{
        values: Object.values(languages)
      }],
    };
    let topReposChart = {
      labels: top10Starred.map((repo) => repo.name),
      datasets: [
        {values: top10Starred.map((repo) => repo.stargazers_count)},
      ]
    };
    const topForkedChart = {
      labels: top10Forked.map(repo=>repo.name),
      datasets:[
        {values: top10Forked.map((repo)=>repo.forks_count)}
      ]
    }
</script>

<div class="container pt-4">
  <div class="charts columns is-multiline">
    <div class="column is-6">
      <div class="card">
        <div class="card-content">
          <h2 class="card-header-title">Top Languages</h2>
          <div class="content">
            <Chart data={chartData} type="percentage" maxSlices={chartData.labels.length} />
          </div>
        </div>
      </div>
    </div>
    <div class="column is-6">
      <div class="card">
        <div class="card-content">
          <h2 class="card-header-title">Stars Per Language</h2>
          <div class="content">
            <Chart data={languageStarsChart} type="percentage" maxSlices={languageStarsChart.labels.length} />
          </div>
        </div>
      </div>
    </div>
    <div class="column is-6">
      <div class="card">
        <div class="card-content">
          <h2 class="card-header-title">Most Starred Repos</h2>
          <div class="content">
            <Chart  data={topReposChart} type="bar" maxSlices={chartData.labels.length} height={350} />
          </div>
        </div>
      </div>
    </div>
    
    <div class="column is-6">
      <div class="card">
        <div class="card-content">
          <h2 class="card-header-title">Most Forked Repos</h2>
          <div class="content">
            <Chart  data={topForkedChart} type="bar" maxSlices={chartData.labels.length} height={350} />
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="title">Top Repos</h2>
  <div class="top-repos columns is-multiline">
    {#each top10Starred as repo}
    <div class="column is-4">
      <div class="card">
        <div class="card-content">
              <p class="has-text-weight-bold is-size-6">
                <a href={repo.html_url}><svg aria-hidden="true" class="octicon" height="16" role="img" viewBox="0 0 12 16" width="12" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg> {repo.name}</a>
              </p>
          <div class="content">
            {repo.description}
          </div>
        </div>
        <div class="card-footer">
          <p class="card-footer-item">{repo.language}</p>
          <p class="card-footer-item">
            <svg aria-hidden="true" class="octicon" height="16" role="img" viewBox="0 0 14 16" width="14" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg> {repo.stargazers_count}</p>
          <p class="card-footer-item"><svg aria-hidden="true" class="octicon" height="16" role="img" viewBox="0 0 10 16" width="10" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg> {repo.forks_count}</p>
          <p class="card-footer-item">{repo.size} KB</p>
        </div>
      </div>
    </div>
    {/each}
  </div>
</div>

<style>
  .top-repos .card-content {
    height: 150px;
  }
</style>