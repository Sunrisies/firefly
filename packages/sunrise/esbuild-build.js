
const esbuild = require('esbuild');
const isProduction = process.env.NODE_ENV === 'production';
const minify = isProduction && require('esbuild-minify-plugin').default;
const { dtsPlugin } = require("esbuild-plugin-d.ts");
const init = async () => {
  let ctxEsm = await esbuild.context({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.esm.js',
    format: 'esm',
    bundle: true,
    platform: 'browser', // 目标平台为浏览器
    loader: { '.ts': 'ts' },
    plugins: isProduction ? [minify(),dtsPlugin()] : [dtsPlugin()],
  })
  await ctxEsm.watch()
}
init()

// const esbuild = require('esbuild');
// console.log(esbuild);




