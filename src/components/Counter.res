@react.component
let make = () => {
  let (count, setCount) = React.useState(() => 0)

  <div>
    <p> {("You clicked " ++ count->string_of_int ++ " times")->React.string} </p>
    <button onClick={_ => setCount(_ => count + 1)}> {"Click here"->React.string} </button>
  </div>
}
