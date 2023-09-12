import "./style.css";

import { createTextClipReveal } from "../../lib";
import SplitText from "./gsap/SplitText";
import { gsap } from "gsap";

const h1 = document.querySelector("h1");
console.log({ h1 });
createTextClipReveal(["h1"], { SplitText }, { observeWindowResize: true });

gsap.to("body", { x: 10, force3D: false });
