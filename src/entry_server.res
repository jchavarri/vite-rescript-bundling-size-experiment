@module("preact-render-to-string") external renderToString: React.element => string = "render"

let render = url => {
  renderToString(<App url={url} />)
}
