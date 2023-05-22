import type { Meta, StoryObj } from "@storybook/web-components";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Marquee, MarqueeSettings } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Marquee",
  tags: ["autodocs"],
  render(args) {
    return html`<marquee-example
      speed="${args.speed}"
      velocity="${args.velocity}"
      direction="${args.direction}"
    />`;
  },
  argTypes: {
    speed: { control: "number", defaultValue: 1 },
    velocity: { control: "number", defaultValue: 0 },
    direction: { control: "select", options: ["rtl", "ltr", "scroll", "scroll-reverse"] },
  },
} satisfies Meta<MarqueeSettings>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    speed: 1,
  },
};
