import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Marquee, MarqueeDirection } from "..";
import style from "../../tailwind.css?inline";

@customElement("marquee-example")
export class MarqueeExample extends LitElement {
  static styles = [unsafeCSS(style)];

  @property({ type: Number }) speed?: number;
  @property({ type: Number }) velocity?: number;
  @property({ type: String }) direction?: MarqueeDirection;

  marquee?: Marquee;
  progress = 0;
  tick?: () => any;

  async connectedCallback() {
    super.connectedCallback();
    this.createMarquee();
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, old, value);
    this.createMarquee();
  }

  disconnectedCallback(): void {
    this.marquee?.destroy();
  }

  createMarquee = async () => {
    await this.updateComplete;
    this.marquee?.destroy();
    this.marquee = new Marquee(
      this.shadowRoot!.querySelector("#marquee"),
      {
        speed: this.speed,
        velocity: this.velocity,
        direction: this.direction,
      },
      { shouldResetOnResize: undefined }
    );
  };

  // Render the UI as a function of component state
  render() {
    return html`
      <h2 id="marquee" class="text-3xl overflow-hidden">
        <div class="inline-flex flex-nowrap gap-4 mr-4"><b>OWOW</b> AGENCY</div>
      </h2>
    `;
  }
}
