module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    ["@semantic-release/npm", { pkgRoot: "dist" }],
    ["@semantic-release/git", { assets: ["package.json", "./src/**/*.md"] }],
  ],
  tagFormat: "${version}",
  branches: ["main"],
};
