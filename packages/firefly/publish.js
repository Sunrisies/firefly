#!/usr/bin/env node
const { exec } = require('child_process');
const spawn = require('cross-spawn')
function runCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行命令 ${command} 时出错:`, error);
      callback(error); // 传递错误给回调  
    } else if (stderr) {
      console.warn(`命令 ${command} 的标准错误输出:`, stderr);
      callback(new Error(stderr)); // 将标准错误输出作为错误传递  
    } else {
      console.log(`命令 ${command} 执行成功:`, stdout);
      callback(null); // 没有错误，传递 null 给回调  
    }
  });
}
runCommand('npm version patch', (errorPatch) => {
  if (errorPatch) {
    console.error('npm version patch 执行失败，跳过 npm publish。');
    return;
  }
  runCommand('npm config set registry=https://registry.npmjs.org/', (errorPatch) => {
    if (errorPatch) {
      console.error('npm version patch 执行失败，跳过 npm publish。');
      return;
    }
  })
  runCommand('npm config get registry', (errorPatch) => {
    if (errorPatch) {
      console.error('npm version patch 执行失败，跳过 npm publish。');
      return;
    }
  })
  const child = spawn('npm', ['publish'], { stdio: 'inherit' })
  child.on('close', (res) => {
    runCommand('npx nrm use taobao', (errorPatch) => {
      if (errorPatch) {
        console.error('npx nrm use taobao 执行失败，');
        return;
      }
    })
    if (res === 0) {
      console.log('上传成功')
      return
    }
    console.log('上传失败')
    
  })
});

