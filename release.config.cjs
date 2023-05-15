module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      { assets: ["package.json", "dist/**/*.js", "dist/**/*.cjs", "dist/**/*.d.ts"] },
    ],
  ],
  tagFormat: "${version}",
  branches: ["main"],
};
