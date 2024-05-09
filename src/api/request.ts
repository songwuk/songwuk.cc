export const TOKEN = "xxxxx"
import { Octokit } from "octokit";
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: TOKEN});
// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
// Octokit.js
const res = await octokit.request('GET /licenses', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})
console.log(res)
