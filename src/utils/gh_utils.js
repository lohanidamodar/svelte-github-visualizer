import { Octokit } from '@octokit/rest';
let octokit = new Octokit();

const getAllRepos = async username => {
    let allItems = [];
    const per_page = 100;
    let page = 1;
    let res;
    while (page > 0) {
        res = await octokit.repos.listForUser({
            username: username,
            per_page: per_page,
            page: page,
        });
        if (!res || !res.data || !res.data.length)
            page = -1;
        allItems = allItems.concat(res.data);
        page++;
    }
    return { repos: allItems, headers: res.headers };
}

const getUser = username => {
    return octokit.users.getByUsername({ username: username });
}

const getUserStats = async username => {
    const userRes = await getUser(username);
    const user = userRes.data;
    if (!user || !user.public_repos || user.public_repos < 1) {
        return null;
    }
    const { repos, headers } = await getAllRepos(username);
    return { user, repos, headers };
}

export {
    getAllRepos,
    getUser,
    getUserStats,
}