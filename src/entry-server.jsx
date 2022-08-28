import renderToString from 'preact-render-to-string';
import { App } from './App'

export function render(url) {
  return renderToString(
      <App url={url}/>
  )
}
