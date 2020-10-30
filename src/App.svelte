<script>
  import Router from 'svelte-spa-router';
  import {routes} from './routes.js';
  import CornerGithub from './components/CornerGithub.svelte';
</script>

<main>
  <CornerGithub />
  <Router {routes} />
</main>