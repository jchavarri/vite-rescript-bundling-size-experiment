@val external process: 'a = "process"

@react.component
let make = () => {
  let default = "default message here"
  let msg = try {
    switch process["env"]["MY_CUSTOM_SECRET"] {
    | None => default
    | Some(msg) => msg
    }
  } catch {
  | _exn => default
  }
  <h1> {msg->React.string} </h1>
}
