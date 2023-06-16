import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import style from "../../../tailwind.css?inline";

@customElement("second-order-dynamics-example")
export class SecondOrderDynamicsExample extends LitElement {
  static styles = [unsafeCSS(style)];

  render() {
    return html`<iframe
      src="https://codesandbox.io/embed/second-order-dynamics-bzy73c?fontsize=14&hidenavigation=1&theme=dark"
      style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
      title="second order dynamics"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>`;
  }
}
