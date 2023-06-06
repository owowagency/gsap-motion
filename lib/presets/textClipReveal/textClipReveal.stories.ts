import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Presets/TextClipReveal",
  parameters: {
    docs: {
      source: { code: null },
      description: {
        story: "Text clip reveal",
      },
    },
  },
  argTypes: {},
  args: {},
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Primary: Story = {
  render() {
    return html`<text-clip-reveal-example />`;
  },
};
