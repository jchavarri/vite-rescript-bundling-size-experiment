@module("preact/compat") external hydrate: (React.element, Dom.element) => unit = "hydrate"
type document // abstract type for a document object
@send external getElementById: (document, string) => Js.Nullable.t<Dom.element> = "getElementById"
@val external doc: document = "document"

let mountPoint = getElementById(doc, MountPoints.counter)
switch mountPoint->Js.Nullable.toOption {
| Some(mountPoint) => hydrate(<Counter />, mountPoint)
| None => ()
}
