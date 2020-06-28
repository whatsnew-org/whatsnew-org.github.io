import dotenv from "dotenv-safe"

dotenv.config()

import fetchReleases from "./releases/index.mjs"
;(async () => {
  const releases = await fetchReleases()
})()
