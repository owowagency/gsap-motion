/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ["lib/index.ts"],
  cleanOutputDir: true,
  out: "wiki",
  plugin: ["typedoc-plugin-markdown", "typedoc-github-wiki-theme"],
  readme: "none",
};
