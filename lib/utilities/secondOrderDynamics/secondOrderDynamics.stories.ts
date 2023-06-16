import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "utilities/Second Order Dynamics",
  parameters: {
    docs: {
      source: { code: null },
    },
  },
  render() {
    return html`<div />`;
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Primary: Story = {
  render() {
    return html`<second-order-dynamics-example />`;
  },
};
