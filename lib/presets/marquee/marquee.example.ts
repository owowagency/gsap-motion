import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Marquee, MarqueeDirection } from "../..";
import style from "../../../tailwind.css?inline";

@customElement("marquee-example")
export class MarqueeExample extends LitElement {
  static styles = [unsafeCSS(style)];

  @property({ type: Number }) speed?: number;
  @property({ type: Number }) velocity?: number;
  @property({ type: String }) direction?: MarqueeDirection;

  marquee?: Marquee;
  progress = 0;
  tick?: () => any;

  protected updated(): void {
    this.createMarquee();
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    this.marquee?.destroy();
    super.attributeChangedCallback(name, old, value);
  }

  disconnectedCallback(): void {
    this.marquee?.destroy();
  }

  createMarquee = async () => {
    this.marquee = new Marquee(
      this.shadowRoot!.querySelector("#marquee"),
      {
        speed: this.speed,
        velocity: this.velocity,
        direction: this.direction,
        scrollTrigger: {
          scroller: this.shadowRoot!.querySelector("#scroller"),
        },
      },
      { shouldResetOnResize: undefined }
    );
  };

  // Render the UI as a function of component state
  render() {
    return html`
      <div id="scroller" class="relative h-56 overflow-y-scroll border border-black">
        <div class="absolute left-6 top-6 text-sm">Do some scrolling</div>
        <div class="h-[150%] flex flex-col justify-center">
          <h2 id="marquee" class="text-3xl overflow-hidden">
            <div class="inline-flex flex-nowrap gap-4 mr-4"><b>OWOW</b> AGENCY</div>
          </h2>
        </div>
      </div>
    `;
  }
}
