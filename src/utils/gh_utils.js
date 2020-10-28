import { Octokit } from '@octokit/rest';
let octokit = new Octokit();

const getAllRepos = async username => {
    let allItems = [];
    const per_page = 100;
    let page = 1;
    debugger;
    while (page > 0) {
        const res = await octokit.repos.listForUser({
            username: username,
            per_page: per_page,
            page: page,
        });
        if (!res || !res.data || !res.data.length)
            page = -1;
        allItems = allItems.concat(res.data);
        page++;
    }
    return allItems;
}

const getUser = username => {
    return octokit.users.getByUsername({username: username});
}

export {
    getAllRepos,
    getUser,
}