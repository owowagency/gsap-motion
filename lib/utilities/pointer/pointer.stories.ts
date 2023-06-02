import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Pointer",
  tags: ["autodocs"],
  render() {
    return html`<pointer-example />`;
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {},
};
