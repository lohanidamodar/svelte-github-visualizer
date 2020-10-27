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
            <Chart data={chartData} showToolTip={false} type="pie" maxSlices={chartData.labels.length} height={350} />
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
          <h2 class="card-header-title">Stars Per Language</h2>
          <div class="content">
            <Chart data={languageStarsChart} showToolTip={false} type="pie" maxSlices={languageStarsChart.labels.length} height={350} />
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

  <h2>Top Repos</h2>
  <div class="columns is-multiline">
    {#each top10Starred as repo}
    <div class="column is-4">
      <div class="card">
        <div class="card-content">
              <p class="card-header-title">
                {repo.name}
              </p>
          <div class="content">
            {repo.description}
          </div>
        </div>
        <div class="card-footer">
          <p class="card-footer-item">{repo.language}</p>
          <p class="card-footer-item">{repo.stargazers_count}</p>
          <p class="card-footer-item">{repo.forks_count}</p>
          <p class="card-footer-item">{repo.size} KB</p>
        </div>
      </div>
    </div>
    {/each}
  </div>
</div>