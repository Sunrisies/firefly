const path = require('path')
// import { Generator } from 'npm-dts'
const {Generator} = require('npm-dts')
console.log(path.resolve(process.cwd(), 'src'))
new Generator({
  entry: 'src/index.ts',
  output: 'cache/tmp/index.d.ts',
  tsc: '--extendedDiagnostics',
}).generate()