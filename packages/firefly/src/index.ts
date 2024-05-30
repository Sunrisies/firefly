#!/usr/bin/env node
import { program } from 'commander'
import chalk from 'chalk'

import createAppTest from './utils/createAppTest'
import { selectTools } from './utils/selectTools'
import getPackageJsonInfo from './utils/getPackageInfo'
program.version(chalk.greenBright(getPackageJsonInfo(process.env.NODE_ENV === 'production'? '../package.json' : '../../package.json', true).version))

program
  .command('create <project-name>')
  .description('为项目文件创建目录')
  .option('-f, --force', '覆盖目标目录（如果存在）')
  .action((name: string, options: Record<string, any>) => {
    createAppTest(name, options)
  })

program
  .command('tools')
  .description('使用工具')
  .action(() =>   selectTools())

program.parse(process.argv)
