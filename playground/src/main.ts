import { SplitText } from "../gsap/all";
import { createMarquee, createTextClipReveal } from "../../lib";
import "./style.css";

const marquee = createMarquee("#marquee-2");
const tcr = createTextClipReveal("#marquee-2", { SplitText });
