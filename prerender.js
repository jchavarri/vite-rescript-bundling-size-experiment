// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry_server.bs.js')

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .filter((file) => file.match(/\.bs.js$/))
  .map((file) => {
    const name = file.replace(/\.bs.js$/, '').toLowerCase()
    return name === 'index' ? `/` : `/${name}`
  })

;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const appHtml = await render(url)

    const html = template.replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()
