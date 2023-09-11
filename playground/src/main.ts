import { SplitText } from "../gsap/all";
import { createMarquee, createMotion, createParallax, createTextClipReveal } from "../../lib";
import "./style.css";

const marquee = createMarquee("#marquee-2");
const tcr = createTextClipReveal("#marquee-2", { SplitText });
const motion = createMotion(() => {
  console.log("create my motion");
  return () => console.log("my motion cleanup");
});

const parallax = createParallax(
  "#parallax",
  { speed: 5, scrollTriggerVars: { markers: true } },
  { observeWindowResize: true }
);
