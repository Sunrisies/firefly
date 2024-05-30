import spawn from 'cross-spawn'
import { select, text } from '@clack/prompts'
const PS = ['ps', '--format', '{{.ID}}\\t{{.Names}}\\t{{.Status}}']
const dockerPsA = ['ps', '-a', '--format', '{{.ID}}\\t{{.Names}}\\t{{.Status}}']
const psImages = ['images', '--format', '{{.Repository}}:{{.Tag}}\\t{{.ID}}\\t{{.CreatedAt}}\\t{{.Size}}']

export const docker = async () => {
  const value = (await select({
    message: '请选择一个工具',
    options: [
      { value: 'delImages', label: '删除不正常的镜像' },
      { value: 'delDocker', label: '删除指定docker容器' }
    ]
  })) as string
  switch (value as string) {
    case 'delImages':
      delDockerImagesApi()
      break
    case 'delDocker':
      deleteDocker()
      break
  }
}
const getDockerName = async (message: string) => {
  while (true) {
    const name = await text({
      message,
      placeholder: 'Not dockerName',
      validate: (value) => {
        if (value.length === 0) {
          return 'Value is required!'
        }
      }
    })

    if (name) {
      return name
    }
  }
}
const deleteDocker = async () => {
  const dockerName = (await getDockerName('请输入你要删除的容器名称')) as string
  await stopDocker(dockerName)
}
const delDockerImagesApi = async () => {
  await dockerPs(null, psImages)
}
const dockerPs = async (dockerName: string, command: Array<string>) => {
  return new Promise((resolve, reject) => {
    const child = spawn('docker', command, {
      stdio: ['inherit', 'pipe', 'pipe'] // 继承标准输入，捕获标准输出和标准错误
    })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (data) => {
      stdout += data
    })

    child.stderr.on('data', (data) => {
      stderr += data
    })
    child.on('close', (code) => {
      if (code !== 0) {
        console.error(`Docker ps failed with exit code ${code}, ${stderr}`)
        return
      }

      const containers = stdout
        .trim()
        .split('\n')
        .map((_) => _.trim().split('\t'))
      containers.forEach((container) => {
        const [id, name, status] = container
        if (dockerName === name) {
          resolve('200')
        } else if (id === '<none>:<none>') {
          delDockerImages(name)
        } else {
          resolve('404')
        }
      })
    })
  })
}

// 停止容器
const stopDocker = async (dockerName: string) => {
  const result = await dockerPs(dockerName, PS)
  if (result === '200') {
    const child = spawn('docker', ['stop', dockerName], {
      stdio: 'inherit'
    })
    child.on('close', (code) => {
      if (code !== 0) {
        console.error(`Docker stop failed with exit code ${code}`)
        return
      }
      delDocker(dockerName)
    })
  } else {
    const result = await dockerPs(dockerName, dockerPsA)
    if (result === '200') {
      delDocker(dockerName)
    } else {
      console.log(`不存在容器名称为:${dockerName}`)
    }
  }
}
// 删除镜像
const delDockerImages = async (dockerName: string) => {
  const child = spawn('docker', ['rmi', dockerName], {
    stdio: 'inherit'
  })
  child.on('close', (code) => {
    if (code !== 0) {
      console.error(`Docker rmi failed with exit code ${code}`)
      return
    }
    console.log(`镜像${dockerName}已删除`)
  })
}
// 删除容器
const delDocker = async (dockerName: string) => {
  const child = spawn('docker', ['rm', dockerName], {
    stdio: 'inherit'
  })
  child.on('close', (code) => {
    if (code !== 0) {
      console.error(`Docker rm failed with exit code ${code}`)
      return
    }
    console.log(`容器${dockerName}已删除`)
  })
}
// 检测docker是否安装
export const checkDocker = () => {
  return new Promise((resolve, reject) => {
    const child = spawn('docker', ['--version'], {
      stdio: 'pipe'
    })
    child.on('close', (code) => {
      code !== 0 ? resolve(false) : resolve(true)
    })
  })
}
