import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { MarqueeSettings } from "../..";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Presets/Marquee",
  parameters: {
    docs: {
      source: { code: null },
      description: {
        story:
          "Emulates the classic marquee effect often seen in cinemas or as attention-grabbing titles on websites. The marquee animation continuously moves a title, text or other content horizontally across the screen, creating a dynamic and eye-catching effect.",
      },
    },
  },
  argTypes: {
    speed: {
      control: "number",
      description: "Controls the speed of the marquee.",
      defaultValue: { summary: "1" },
    },
    velocity: {
      control: { type: "range", min: 0, max: 0.1, step: 0.0001 },
      description: "Controls the velocity of speed increase while scrolling.",
      defaultValue: { summary: 0 },
    },
    direction: {
      control: "select",
      options: ["rtl", "ltr", "scroll", "scroll-reverse"],
      description: "Controls the direction of the marquee.",
      defaultValue: { summary: "rtl" },
    },
    onUpdate: {
      control: null,
      description:
        'A function to call every time the marquee updates (on each "tick"). A `progress` parameter is passed, which indicates the current marquee cycles progress between `0` and `1`',
      defaultValue: { summary: "undefined" },
    },
    onCreated: {
      control: null,
      description: "A function to call after the marquee is created.",
      defaultValue: { summary: "undefined" },
    },
    scrollTrigger: {
      control: null,
      description:
        "Marquee uses a gsap ScrollTrigger instance under the hood. Use this parameter to apply custom properties for the ScrollTrigger.",
      defaultValue: { summary: "{}" },
    },
    createDOMContainers: {
      control: null,
      description:
        "Marquee requires a specific DOM structure: Controls wether the Marquee will create and append its own DOM elements. Set to `false` if you want to implement this yourself.",
      defaultValue: { summary: "true" },
    },
  },
  args: {
    speed: 1,
    velocity: 0,
    direction: "rtl",
  },
} satisfies Meta<MarqueeSettings>;

export default meta;
type Story = StoryObj<MarqueeSettings>;

export const Primary: Story = {
  render(args) {
    return html`<marquee-example
      speed="${args.speed}"
      velocity="${args.velocity}"
      direction="${args.direction}"
    />`;
  },
};
