import { multiselect, select, intro, confirm, text } from '@clack/prompts'
import chalk from 'chalk'
import { signInApi } from '../utils/https'
import {CheckIn} from '../types/index'
import { writeFile, readFile } from '../utils/fileEditing'
import fs from 'node:fs'
import path from 'node:path'
const fileName = '.config.json'
const userDir = process.env.USERPROFILE || process.env.HOME
const filePath = path.join(userDir, fileName)
import { managePm2 } from '../utils/pm2'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
export const signIn = async () => {
  let params = {
    cookie: '',
    aid: '',
    uid: '',
    hour: '',
    minute: ''
  }
  if (fs.existsSync(filePath)) {
    const value = (await confirm({
      message: '读到本地有配置文件，是否重置?'
    })) as Boolean
    if (!value) {
      SelectCheckIn()
      return
    }
    params.cookie = (await text({
      message: '请输入你的cookie',
      placeholder: 'Not cookie',
      validate(value) {
        if (value.length === 0) return `Value is required!`
      }
    })) as string

    params.aid = (await text({
      message: '请输入你的aid',
      placeholder: 'Not aid',
      validate(value) {
        if (value.length === 0) return `Value is required!`
      }
    })) as string
    params.uid = (await text({
      message: '请输入你的uid',
      placeholder: 'Not uid',
      validate(value) {
        if (value.length === 0) return `Value is required!`
      }
    })) as string

    params.hour = (await text({
      message: `${chalk.yellowBright('?')}  请输入你的定时的小时   ${chalk.yellowBright('选填')}`,
      placeholder: 'Not hour'
    })) as string

    params.minute = (await text({
      message: '请输入你的定时分钟(选填)',
      placeholder: 'Not minute'
    })) as string

    const configData = {
      hour: params.hour,
      minute: params.minute,
      cookie: `sessionid=${params.cookie}`,
      url: 'https://juejin.cn/',
      check_url: `https://api.juejin.cn/growth_api/v1/check_in?aid=${params.aid}&uid=${params.uid}`
    }
    const configString = `${JSON.stringify(configData, null, 2)}`
    writeFile(configString)
    SelectCheckIn()
  }
}

const SelectCheckIn = async () => {
  const value = (await select({
    message: '手动签到或自动签到?',
    options: [
      { value: '手动签到', label: '手动签到' },
      { value: '自动签到', label: '自动签到' }
    ]
  })) as string
  const file = await readFile() as CheckIn
  switch (value) {
    case '手动签到':
      signInApi(file)
      break
    case '自动签到':
      managePm2();
      break
  }
}