import Home from './routes/Home.svelte';
import UserStats from './routes/UserStats.svelte';
import NotFound from './routes/NotFound.svelte';

export const routes = {
    '/': Home,
    '/users/:username': UserStats,
    '*': NotFound,
};