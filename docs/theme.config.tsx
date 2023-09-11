import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>@owowagency/gsap-motion</span>,
  head: () => {
    const config = useConfig();
    const title = [config.title, "gsap-motion"].join(" | ");
    return (
      <>
        <title>{title}</title>
      </>
    );
  },
  project: {
    link: "https://github.com/owowagency/gsap-motion",
  },
  // chat: {
  //   link: "https://discord.com",
  // },
  docsRepositoryBase: "https://github.com/owowagency/gsap-motion",
  footer: {
    text: "Nextra Docs Template",
  },
};

export default config;
