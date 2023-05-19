import { Marquee, MarqueeDirection } from "./marquee";
import "../../main.css";

for (const h2 of document.querySelectorAll("h2")) {
  new Marquee(h2, {
    direction: h2.dataset.direction as MarqueeDirection,
    speed: 0.5,
    velocity: h2.dataset.velocity ? parseFloat(h2.dataset.velocity) : undefined,
  });
}
