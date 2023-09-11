import { SplitText } from "../gsap/all";
import {
  createDiorama,
  createMarquee,
  createMotion,
  createParallax,
  createTextClipReveal,
} from "../../lib";
import "./style.css";

// const marquee = createMarquee("#marquee-1");
// const marquee2 = createMarquee("#marquee-2");
// const tcr = createTextClipReveal("#marquee-2", { SplitText });
// const motion = createMotion(() => {
//   console.log("create my motion");
//   return () => console.log("my motion cleanup");
// });

// const parallax = createParallax(
//   "#parallax",
//   { speed: 5, scrollTriggerVars: { markers: true } },
//   { observeWindowResize: true }
// );

const diorama1 = createDiorama("#diorama-1", { size: 3, createDOM: false });
const diorama2 = createDiorama("#diorama-2", {});

onMounted(() => {
  createMotion(
    () => {
      console.log("yeet");
    },
    { observeElementResize: "", observeWindowResize: true }
  );
});
