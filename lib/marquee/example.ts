import { Marquee } from "./marquee";
import gsap from "gsap";
import "../../main.css";

const innerNodes = document.getElementsByClassName("owow-marquee-inner");

new Marquee("h1", {
  velocity: 0.001,
  direction: "scroll",
  speed: 2,
  onUpdate(progress) {
    const _progress = Math.sin(Math.PI * (progress * 5));
    let index = 0;
    for (const node of innerNodes) {
      gsap.set(node, { y: 10 * _progress * (index % 2 === 0 ? 1 : -1) });
      index++;
    }
  },
});
