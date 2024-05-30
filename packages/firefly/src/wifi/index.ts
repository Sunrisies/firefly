import {  select } from '@clack/prompts'
import { getAllWifiInfo } from "../utils/getAllWifiInfo"

export const wifi = async () => {
  const value = (await select({
    message: '请选择要进行的操作：',
    options: [
      { value: '获取连接过的WiFi信息', label: '获取连接过的WiFi信息' },
    ]
  })) as string
  
  switch (value) {
    case "获取连接过的WiFi信息":
      getAllWifiInfo();
      break;
  }
};