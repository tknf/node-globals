const path = require("path");
const babel = require("@rollup/plugin-babel").default;
const nodeResolve = require("@rollup/plugin-node-resolve").default;
const { version } = require("./package.json");

function createBanner(version) {
  const banner = `/**
  * @tknf/node-globals v${version}
  * 
  * Copyright (c) TKNF LLC
  * 
  * This source code is licensed under the MIT license found in the
  * LICENSE file in the root directory of this source tree.
  * 
  * @license MIT
  */`;
  return banner;
}

/**
 * @returns { import("rollup").RollupOptions[] }
 */
module.exports = function rollup() {
  const sourceDir = "src";
  const outputDir = "dist";

  return [
    {
      external(id) {
        return !id.startsWith(".") && !path.isAbsolute(id);
      },
      input: `${sourceDir}/index.ts`,
      output: {
        banner: createBanner(version),
        dir: outputDir,
        format: "cjs",
        preserveModules: true,
        exports: "named"
      },
      plugins: [
        babel({
          babelHelpers: "bundled",
          exclude: /node_modules/,
          extensions: [".ts"]
        }),
        nodeResolve({ extensions: [".ts"] })
      ]
    }
  ];
};
