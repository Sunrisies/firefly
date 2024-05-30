import { execSync } from 'child_process'
import chalk from 'chalk'
export const getAllWifiInfo = () => {
  execSync('chcp 65001')
  const profilesInfo = execSync('netsh wlan show profiles').toString()
  const profileNames = profilesInfo.match(/All User Profile\s*:\s*(.*)/g).map((s) => s.split(':')[1].trim())
  if (profileNames.length === 0) {
    console.error('当前电脑没有wifi信息')
    return
  }
  // 获取每个Wi-Fi的密码并输出
  for (const name of profileNames) {
    const passwordInfo = execSync(`netsh wlan show profile name="${name}" key=clear`)
    const passwordMatch = passwordInfo.toString().match(/Key Content\s*:\s*(.*)/)
    const password = passwordMatch ? passwordMatch[1].trim() : '无密码'
    console.log(`    ${chalk.greenBright(name)} : ${chalk.yellowBright(password)}`)
  }
  process.exit()
}
