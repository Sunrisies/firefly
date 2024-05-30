import { multiselect, select, intro, confirm } from '@clack/prompts'
import chalk from 'chalk'
interface Responses {
  isTs: Boolean
  packageManager: string
  npmSource: string
}

/**
 * @description 终端交互，获取用户的项目预设
 * @returns 返回用户的项目预设 Responses
 */
async function projectSelect() {
  const responses: Responses = {
    isTs: false,
    packageManager: '',
    npmSource: ''
  }

  intro(chalk.green(' create-you-app '))

  responses.isTs = (await confirm({
    message: '是否支持typeScript?'
  })) as Boolean

  return { ...responses}
}

export { projectSelect }
