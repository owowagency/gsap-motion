/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ["src/main.ts"],
  cleanOutputDir: true,
  out: "wiki",
  plugin: ["typedoc-plugin-markdown", "typedoc-github-wiki-theme"],
  readme: "none",
};
