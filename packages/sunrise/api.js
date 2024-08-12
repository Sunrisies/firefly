console.log('hello sunrise')
const { exec } = require('child_process');  
  
// 定义命令  
const command = 'npm run test';  
  
// 使用exec运行命令  
exec(command, (error, stdout, stderr) => {  
  if (error) {  
    console.error(`执行出错: ${error}`);  
    return;  
  }  
  if (stderr) {  
    console.error(`标准错误输出: ${stderr}`);  
    return;  
  }  
  console.log(`标准输出: ${stdout}`);  
}); 