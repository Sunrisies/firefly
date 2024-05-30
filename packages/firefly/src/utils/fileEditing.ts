import fs from 'node:fs'
import path from 'node:path'

const fileName = '.config.json'
const userDir = process.env.USERPROFILE || process.env.HOME
const filePath = path.join(userDir, fileName)
import {CheckIn} from '../types/index'
export const writeFile = (configString) => {
  try {
    fs.writeFile(filePath, configString, 'utf8', (err) => {
      if (err) {
        console.error('写入文件时发生错误:', err)
        return
      }
    })
  } catch (err) {
    console.error('写入文件时发生错误:', err)
  }
}
export const readFile = ():Promise<CheckIn> => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const jsonData = JSON.parse(data)
          resolve(jsonData)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}
