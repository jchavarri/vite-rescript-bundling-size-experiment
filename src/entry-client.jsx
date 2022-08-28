import { hydrate } from "preact/compat";
import Counter from "./components/Counter";

const mountPoint = document.getElementById("mount-counter");
if (mountPoint) {
  hydrate(<Counter></Counter>, mountPoint);
}
