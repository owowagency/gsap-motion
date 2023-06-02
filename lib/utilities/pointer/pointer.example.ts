import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Pointer } from "../..";
import gsap from "gsap";
import style from "../../../tailwind.css?inline";

@customElement("pointer-example")
export class MarqueeExample extends LitElement {
  static styles = [unsafeCSS(style)];
  chaserCount = 10;

  @state() private _clientX = 0;
  @state() private _clientY = 0;
  @state() private _normalX = 0;
  @state() private _normalY = 0;
  @state() private _viewWidth = 0;
  @state() private _viewHeight = 0;

  async connectedCallback() {
    super.connectedCallback();
    this.createChaser();
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, old, value);
    this.createChaser();
  }

  createChaser = async () => {
    await this.updateComplete;

    const elements = this.shadowRoot?.querySelectorAll("div.chaser");
    const size = 10;

    if (!elements) return;

    elements.forEach((el) => {
      const color = `rgb(${Array.from({ length: 3 }, () => Math.random() * 255).join(",")})`;
      gsap.set(el, {
        position: "fixed",
        background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.5), ${color})`,
        width: size,
        height: size,
        left: -size / 2,
        top: -size / 2,
        borderRadius: "25px",
        pointerEvents: "none",
        zIndex: 10,
      });
    });

    gsap.ticker.add(() => {
      let index = 0;

      this._clientX = Pointer.instance.clientX;
      this._clientY = Pointer.instance.clientY;
      this._normalX = Pointer.instance.normalX;
      this._normalY = Pointer.instance.normalY;
      this._viewWidth = Pointer.instance.viewWidth;
      this._viewHeight = Pointer.instance.viewHeight;

      for (const el of elements) {
        const progress = gsap.utils.mapRange(0, elements.length - 1, 0.1, 0.5, index);

        const x = gsap.utils.interpolate(
          gsap.getProperty(el, "x") as number,
          Pointer.instance.clientX,
          progress * gsap.ticker.deltaRatio()
        );

        const y = gsap.utils.interpolate(
          gsap.getProperty(el, "y") as number,
          Pointer.instance.clientY,
          progress * gsap.ticker.deltaRatio()
        );

        gsap.set(el, { x, y });
        index++;
      }
    });
  };

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="grid grid-cols-[max-content_1fr] gap-x-4">
        <p>View size:</p>
        <p class="font-mono">${this._viewWidth} x ${this._viewHeight}</p>

        <p>Client X:</p>
        <p class="font-mono">${this._clientX}</p>

        <p>Client Y:</p>
        <p class="font-mono">${this._clientY}</p>

        <p>Normalized X:</p>
        <p class="font-mono">${this._normalX}</p>

        <p>Normalized Y:</p>
        <p class="font-mono">${this._normalY}</p>
      </div>

      ${Array.from({ length: this.chaserCount }, () => html`<div class="chaser" />`)}
    `;
  }
}
