// @module("preact-render-to-string") external render: React.element => string = "render"
module Router = {
  @react.component @module("preact-router")
  external make: (~url: string, ~children: React.element) => React.element = "Router"
}
module Link = {
  @react.component @module("preact-router")
  external make: (~href: string, ~children: React.element) => React.element = "Link"
}

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
let pages = %raw(`import.meta.glob("./pages/*.bs.js", { eager: true })`)

type route = {
  name: string,
  path: string,
  component: unit => React.element,
}
let routes = Js.Dict.keys(pages)->Js.Array2.map(path => {
  let name =
    path
    ->Js.String2.match_(%re("/\.\/pages\/(.*)\.bs\.js$/"))
    ->Belt.Option.getExn
    ->Js.Array2.unsafe_get(1)
  {
    name: name,
    path: name === "Index" ? "/" : `/${name->Js.String2.toLowerCase}`,
    component: Js.Dict.unsafeGet(pages, path)["make"],
  }
})

@react.component
let make = (~url) => {
  <>
    <nav>
      <ul>
        {routes
        ->Js.Array2.map(({name, path}) => {
          <li key={path}>
            <Link href={path === "/" ? path : path ++ ".html"}> {name->React.string} </Link>
          </li>
        })
        ->React.array}
      </ul>
    </nav>
    <Router url={url}>
      {routes
      ->Js.Array2.map(({path, component: routeComp}) => {
        module T = {
          let makeProps: (
            ~key: string,
            ~path: string,
            unit,
          ) => unit = %raw(`function (prim0, prim1, prim2) {
      var tmp = {};
      if (prim0 !== undefined) {
        tmp.key = prim0;
      }
      if (prim1 !== undefined) {
        tmp.path = prim1;
      }
      if (prim2 !== undefined) {
        tmp.children = prim2;
      }
      return tmp;
    }`)
          let make = routeComp
        }

        <T key={path} path={path} />
      })
      ->React.array}
    </Router>
  </>
}
