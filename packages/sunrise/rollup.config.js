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
module.exports = 
  {
    input: 'src/index.ts', // 入口文件，可以和 CommonJS 配置使用同一个入口  
    output: {
      file: 'dist/index.esm.js', // 输出文件名，可以用 [name] 占位符来生成多份输出
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
      isProduction && uglify()
    ],
  }
