const express = require('express');
const multer = require('multer');
const cors = require('cors');  
const app = express();
const port = 3000;
app.use(cors());  
// 设置存储配置（仅为示例，实际生产中可能需要配置为持久化存储）
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')  // 上传文件存储的目录
  },
  filename: function (req, file, cb) {
    console.log(file,'-1-1--1-1-1')
    cb(null, file.originalname)  // 上传文件的文件名
  }
});

// 设置文件上传的中间件
const upload = multer({ storage: storage });

// 路由：用于文件上传
app.post('/uploadBig', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // 文件已上传成功
  res.status(200).send('File uploaded successfully.');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});