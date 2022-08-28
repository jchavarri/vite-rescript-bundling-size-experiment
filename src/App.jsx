import { Link, Router } from "preact-router";

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob("./pages/*.jsx", { eager: true });

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
  return {
    name,
    path: name === "Index" ? "/" : `/${name.toLowerCase()}`,
    component: pages[path].default,
  };
});

export function App({ url }) {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link href={path === "/" ? path : path + ".html"}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Router url={url}>
        {routes.map(({ path, component: RouteComp }) => {
          return <RouteComp key={path} path={path}></RouteComp>;
        })}
      </Router>
    </>
  );
}
