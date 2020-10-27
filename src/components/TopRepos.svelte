<script>
    import Chart from 'svelte-frappe-charts';
    export let repos;
    let myrepos = [];
    if(repos.length > 0) {
      myrepos = repos.filter((r) => !r.fork); 
    }
    let sorted = myrepos.sort((a,b) => {
      if (a.stargazers_count > b.stargazers_count) return -1
      else if (a.stargazers_count < b.stargazers_count) return 1
      return 0
    });
    let languages = {};
    for(const repo of sorted) {
      languages[repo.language] = languages[repo.language] || 0;
      ++languages[repo.language];
    }
    if (languages["null"]) {
                languages.Others = languages["null"];
                delete languages["null"];
            }
    let arrData = Object.keys(languages).map(function (cLang) {
            return {
                label: cLang
              , value: languages[cLang]
              // , color: GitHubColors.get(cLang, true).color
            };
        });
    let langarr=arrData.sort(function (a, b) {
            return a.value < b.value ? 1 : -1;
        });
    let top10 = sorted.splice(0,9);
    let chartData = {
      labels: Object.keys(languages),
      datasets: [{
        values: Object.values(languages)
      }],
    };
    console.log(chartData);
    let data = {
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    datasets: [
      {
        values: [10, 12, 3, 9, 8, 15, 9]
      }
    ]
  };
</script>

<div class="container pt-4">
  <div class="charts columns">
    <div class="card column">
      <div class="card-content">
        <h2 class="card-header-title">Top Languages</h2>
        <div class="content">
          <Chart  data={chartData} showToolTip={false} type="pie" maxSlices={chartData.labels.length} height={350} />
        </div>
      </div>
    </div>
    <div class="card column">
      <div class="card-content">
        <h2 class="card-header-title">Top Languages</h2>
        <div class="content">
          <Chart  data={chartData} type="bar" maxSlices={chartData.labels.length} height={350} />
        </div>
      </div>
    </div>
  </div>

  <h2>Top Repos</h2>
  <div class="columns is-multiline">
    {#each top10 as repo}
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