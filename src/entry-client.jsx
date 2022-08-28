import ReactDOM from "react-dom/client";
import Counter from "./components/Counter";

ReactDOM.hydrateRoot(
  document.getElementById("mount-counter"),
  <Counter></Counter>
);
