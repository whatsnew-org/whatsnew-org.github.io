import fetch from "cross-fetch"
import debug from "debug"

import json from "../utils/json.mjs"
import isNew from "../utils/isNew.mjs"

const { repos } = json("./lib/releases/repos.json")

const log = debug("lib:releases")

const query = `query getReleases($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    releases (last: 1) {
      edges {
        node {
          id
          publishedAt
          isPrerelease
          isDraft
        }
      }
    }
  }
}`

const fetchRelease = async (owner, repo) => {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({
      query,
      variables: {
        owner,
        repo,
      },
    }),
    headers: {
      Authorization: `bearer ${process.env.GH_TOKEN}`,
    },
  })

  const { data } = await res.json()

  const release = data.repository.releases.edges[0].node
  return release
}

export default async () => {
  for (let index = 0; index < repos.length; index++) {
    const { owner, repo } = repos[index]
    log(`Fetching: ${owner}/${repo}`)
    const release = await fetchRelease(owner, repo)
    if (release.isDraft && release.isPrerelease) {
      if (isNew(release.publishedAt)) {
        log(`${owner}/${repo}`)
      }
    }
  }
}
