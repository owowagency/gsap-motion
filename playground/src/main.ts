import { gsap } from "gsap";
import "./style.css";
import { createMotion, physicsBasedMotion, createMarquee, Marquee } from "../../lib";

const motion = createMotion(
  () => {
    console.log("create dummy motion");
    const tween = gsap.to("body", { background: "black", duration: 3, yoyo: true, repeat: -1 });
    return (destroyed) => {
      console.log("cleanup dummy motion", { destroyed });
      tween.revert().kill();
    };
  },
  { observeWindowResize: true }
);

const marquee = createMarquee(
  "#marquee-2",
  {
    speed: 3,
    onCreated() {
      console.log("created");
    },
    onUpdate(progress) {
      // console.log({ progress });
    },
  },
  {
    observeWindowResize: true,
  }
);

// const marquee = new Marquee("#marquee-2");
