const { build } = require("esbuild");
const { Generator } = require('npm-dts')

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: "dist/index.js",
});

build({
  ...sharedConfig,
  outfile: "dist/index.esm.js",
  platform: 'neutral', // for ESM
  format: "esm",
});

// for typings
const d = new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate()
d.then((e) => console.log(e,'typings generated'))
new Generator({
  entry: 'src/utils/timer.ts',
  output: 'dist/timer.d.ts',
}).generate()