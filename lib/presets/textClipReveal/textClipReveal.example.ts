import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from "../../../tailwind.css?inline";
import { TextClipReveal } from "./textClipReveal";

@customElement("text-clip-reveal-example")
export class TextClipRevealExample extends LitElement {
  static styles = [unsafeCSS(style)];

  @property({ attribute: false }) isSupported = true;
  titleReveal?: TextClipReveal;
  textReveal?: TextClipReveal;

  protected updated(): void {
    this.createTextClipReveal();
  }

  private createTextClipReveal() {
    this.titleReveal = new TextClipReveal(this.shadowRoot!.querySelector("h1"));
    this.textReveal = new TextClipReveal(this.shadowRoot!.querySelector("p"));
    this.isSupported = !!this.titleReveal.meta.childSplit;

    this.shadowRoot!.querySelector("button")?.addEventListener("click", () => {
      this.titleReveal?.meta.tween?.play(0);
      this.textReveal?.meta.tween?.play(0);
    });
  }

  render() {
    return this.isSupported
      ? html`<div class="flex flex-col gap-4">
          <h1 class="text-2xl leading-[0.9]"><b>OWOW</b> AGENCY</h1>

          <p>
            With more than a decade of experience, we help you grow your business with staggering
            brands, apps, websites and platforms that put flesh on the bones of your digital
            strategy. Our designers and developers always stay on top of the latest technologies in
            the field, allowing them to create the best digital products for your customers. Work
            with us if you want to convert your digital business challenges into striking solutions
            at the speed of light.
          </p>

          <div>
            <button
              class="px-4 py-2 border rounded-md hover:bg-yellow-300 active:bg-yellow-50"
              type="button"
            >
              Play
            </button>
          </div>
        </div>`
      : html`<iframe
          src="https://codesandbox.io/embed/owowagency-gsap-motion-textclipreveal-5jqjzc?fontsize=14&hidenavigation=1&theme=dark&view=preview"
          style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
          title="@owowagency/gsap-motion/TextClipReveal"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>`;
  }
}
