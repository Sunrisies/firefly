import { multiselect, select, intro, confirm } from '@clack/prompts'
import { wifi } from '../wifi/index'
import { signIn } from '../signIn/index'
import { getNpmSourceInfo } from '../getNpmSource/index'
import { docker, checkDocker } from '../docker/index'
const options = [
  { value: 'wifi', label: 'wifi' },
  { value: '掘金签到', label: '掘金签到' },
  { value: '检测当前npm源', label: '检测当前npm源' },
  { value: 'Docker', label: 'docker容器' }
]
export const selectTools = async () => {
  const isDocker = await checkDocker()
  if (!isDocker) {
    options.pop()
  }
  const value = (await select({
    message: '请选择一个工具',
    options
  })) as string
  switch (value) {
    case 'wifi':
      wifi()
      break
    case '掘金签到':
      signIn()
      break
    case '检测当前npm源':
      getNpmSourceInfo()
      break
    case 'Docker':
      docker()
      break
  }
}
