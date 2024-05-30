// 导入依赖
const typescript = require('rollup-plugin-typescript2')
const replace = require('rollup-plugin-replace')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('@rollup/plugin-babel')
const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser') // 用于压缩代码
const { readFileSync } = require('node:fs')
const path = require('path')

const { uglify } = require('rollup-plugin-uglify'); // 用于压缩 UMD 版本 
const pkg = require('./package.json');
const isProduction = process.env.NODE_ENV === 'production';
module.exports = [
  // CommonJS 打包配置  
  {
    input: 'src/node/index.ts', // 入口文件  
    output: {
      file: 'dist/your-library-name.cjs.js',
      format: 'cjs', // CommonJS 格式  
      exports: 'named', // 如果你想导出命名导出，使用 'named'；如果只有一个默认导出，使用 'default'  
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.rollup.json', }),
      resolve(), // 告诉 Rollup 如何查找外部模块  
      commonjs(), // 将 CommonJS 转换为 ES6，以便 Rollup 可以处理它  
      babel({ // 如果你需要 Babel 转换你的代码（例如，为了支持旧版浏览器）  
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env']
      }),
      isProduction && uglify() // 生产环境下压缩代码  
    ],
  },
  // ES6 模块打包配置  
  {
    input: 'src/browser/index.ts', // 入口文件，可以和 CommonJS 配置使用同一个入口  
    output: {
      file: 'dist/your-library-name.esm.js',
      format: 'esm', // ES6 模块格式  
      exports: 'named', // 同上  
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.rollup.json', }),
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env']
      }),
      // isProduction && uglify()
    ],
  },
  // UMD 打包配置  
  {
    input: 'src/browser/index.ts', // 入口文件，可以和上面配置使用同一个入口  
    output: {
      file: 'dist/your-library-name.umd.js',
      format: 'umd', // UMD 格式  
      name: 'YourLibraryName', // UMD 全局变量名  
      exports: 'named', // 同上  
      globals: { // 如果你的库依赖其他 UMD 库，可以在这里指定全局变量名  
        // 'some-dependency': 'SomeDependency'  
      },
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.rollup.json', }),
      replace({
        'process.env.IS_BROWSER': JSON.stringify(true),
        'process.browser': JSON.stringify(true),
      }),
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env']
      }),
      isProduction && uglify() // 生产环境下压缩代码  
    ],
  },
  // input: "./src/index.ts",
  // output: {
  //   file: path.resolve(__dirname, "./dist/index.js"),
  //   sourcemap: true,
  //   // format: "cjs",
  //   format: "esm",
  //   exports: 'named'
  // },

  // plugins: [
  //   typescript({ tsconfig: './tsconfig.rollup.json', }),
  //   replace({  
  //     'process.env.NODE_ENV': JSON.stringify('production'),
  //     'process.browser': JSON.stringify(true),
  //   }),
  //   commonjs(), // 将 CommonJS 转换为 ES6，以便它们可以在 Rollup 包中使用  
  //   terser(),
  //   resolve(), // 允许 Rollup 查找外部模块  
  // ],
  // external: Object.keys(pkg.peerDependencies || {}), // 排除 peerDependencies 中的模块，这样它们不会被打包进库文件
]