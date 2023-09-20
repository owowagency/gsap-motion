import "./style.css";

import { createMarquee, createTextClipReveal } from "../../lib";
import SplitText from "./gsap/SplitText";
import { gsap } from "gsap";

const h1 = document.querySelector("h1");
console.log({ h1 });
createMarquee(["h1"], {}, { enable:false });

gsap.to("body", { x: 10, force3D: false });
