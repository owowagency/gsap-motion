import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import style from "../../../tailwind.css?inline";
import { createMotion } from "./motion";
import { gsap } from "gsap";

@customElement("motion-resize-example")
export class MotionResizeExample extends LitElement {
  static styles = [unsafeCSS(style)];

  protected firstUpdated(): void {
    const element = this.shadowRoot!.getElementById("motion-example")!;

    const motion = createMotion(
      () => {
        const rect = element.getBoundingClientRect();

        console.log("set color", rect);
        gsap.set(element, { background: rect.width > 800 ? "green" : "blue" });

        return (destroyed) => {
          console.log("clean up motion", destroyed);
        };
      },
      {
        enable: () => true,
        matchMedia: () => "(min-width: 600px)",
        observeElementResize: () => [element],
        revertOnDestroy: true,
      }
    );
  }

  // Render the UI as a function of component state
  render() {
    return html`<div id="motion-example"><p>Motion example</p></div>`;
  }
}
