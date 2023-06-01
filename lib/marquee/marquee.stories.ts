import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { MarqueeSettings } from "..";

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
    speed: { control: "number" },
    velocity: { control: { type: "range", min: 0, max: 0.1, step: 0.0001 } },
    direction: { control: "select", options: ["rtl", "ltr", "scroll", "scroll-reverse"] },
  },
  args: {
    speed: 1,
    velocity: 0,
    direction: "rtl",
  },
} satisfies Meta<MarqueeSettings>;

export default meta;
type Story = StoryObj<MarqueeSettings>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {};
