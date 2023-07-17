import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import style from "../../../tailwind.css?inline";
import { Motion } from "./motion";

@customElement("motion-resize-example")
export class MotionResizeExample extends LitElement {
  static styles = [unsafeCSS(style)];

  connectedCallback(): void {
    new Motion(
      () => {
        console.log("create motion");
      },
      {
        shouldResetOnResize: [window, "horizontal"],
      }
    );
  }

  // Render the UI as a function of component state
  render() {
    return html`<div>Watching window resizes...</div>`;
  }
}
