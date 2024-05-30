import { exec } from 'child_process'
import spawn from 'cross-spawn'
import getPackageJsonInfo from './getPackageInfo'

import path from 'node:path'
const APP_PATH = './dist/signIn/http' // 要启动的应用路径
// 停止并删除进程
function stopAndDeleteProcess(id) {
  return new Promise((resolve, reject) => {
    exec(`pm2 stop ${id} && pm2 delete ${id}`, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(`进程 ${id} 已成功停止和删除。`)
      }
    })
  })
}

// 启动进程
function startProcess(path) {
  return new Promise((resolve, reject) => {
    exec(`pm2 start ${path}`, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(`新进程已成功启动。`)
      }
    })
  })
}

// 主逻辑
export async function managePm2() {
  const APP_PATH = await getNpmConfig()
  try {
    // 尝试停止并删除进程
    console.log(await stopAndDeleteProcess(0))
    // // 启动新进程
    await startProcess(APP_PATH)
  } catch (error) {
    console.error('管理PM2进程时发生错误:', error)
    await startProcess(APP_PATH)
  }
  process.exit()
}
const getNpmConfig = () => {
  return new Promise((resolve, reject) => {
    exec('npm root -g', (error, stdout, stderr) => {
      if (error) {
        reject(error)
        console.error(`执行错误: ${error}`)
        return
      }
      if (stderr) {
        reject(error)
        console.error(`标准错误输出: ${stderr}`)
        return
      }
      const name = getPackageJsonInfo('../../package.json', true).name.split('/')
      // const pathUrl = `${stdout.trim()}${path.sep}node_modules${path.sep}${name[0]}${path.sep}${name[1]}${path.sep}dist${
      //   path.sep
      //   }signIn${path.sep}http.js`
      const pathUrl = 'C:\\Users\\hover\\Desktop\\test\\npm\\npm-cli\\packages\\firefly\\dist\\signIn\\http.js'
      resolve(pathUrl)
    })
  })
}
