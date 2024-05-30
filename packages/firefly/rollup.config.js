// 导入依赖
const typescript = require('rollup-plugin-typescript2')
const replace  = require('rollup-plugin-replace')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser') // 用于压缩代码
const { readFileSync } = require('node:fs')
const path = require('path')

module.exports = {
  input: "./src/index.ts",
  output: {
    file: path.resolve(__dirname, "./dist/index.js"),
    sourcemap: true,
    format: "cjs",
  },

  plugins: [
    typescript({ tsconfig: './tsconfig.rollup.json', }),
    replace({  
      'process.env.NODE_ENV': JSON.stringify('production')  
    }),
    terser()
  ]
}
