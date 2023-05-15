const path = require("path");

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ["lib/motion.ts", "lib/pointer.ts"],
  cleanOutputDir: true,
  out: "wiki",
  plugin: ["typedoc-plugin-markdown", "typedoc-github-wiki-theme"],
  readme: "none",
};
