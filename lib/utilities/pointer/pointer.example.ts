import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Marquee, MarqueeDirection, Pointer } from "../..";
import gsap from "gsap";
import style from "../../../tailwind.css?inline";

@customElement("pointer-example")
export class MarqueeExample extends LitElement {
  static styles = [unsafeCSS(style)];

  @property({ type: Number }) speed?: number;
  @property({ type: Number }) velocity?: number;
  @property({ type: String }) direction?: MarqueeDirection;

  marquee?: Marquee;

  async connectedCallback() {
    super.connectedCallback();
    this.createChaser();
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, old, value);
    this.createChaser();
  }

  disconnectedCallback(): void {
    this.marquee?.destroy();
  }

  createChaser = async () => {
    await this.updateComplete;
    const elements = this.shadowRoot?.querySelectorAll("div");
    if (!elements) return;

    elements.forEach((el) => {
      const color = `rgb(${Array.from({ length: 3 }, () => Math.random() * 255).join(",")})`;

      gsap.set(el, {
        position: "fixed",
        background: `radial-gradient(circle at 25% 25%, white, ${color})`,
        width: 50,
        height: 50,
        left: -25,
        top: -25,
        borderRadius: "25px",
        pointerEvents: "none",
      });
    });

    gsap.ticker.add(() => {
      let index = 0;

      for (const el of elements) {
        const progress = 0.1 + 0.05 * index;

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
      Pointer.instance.clientX;
    });
  };

  // Render the UI as a function of component state
  render() {
    return html`${Array.from({ length: 3 }, () => html`<div />`)}`;
  }
}
