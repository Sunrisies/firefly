//每片的大小
var chunkSize = 1 * 1024 * 1024
var uploadResult = document.getElementById('uploadResult')
var fileMd5Span = document.getElementById('fileMd5')
var checkFileRes = document.getElementById('checkFileRes')
var fileMd5

function calculateFileMD5() {
  console.time('开始计算文件MD5')
  var fileInput = document.getElementById('fileInput')
  var file = fileInput.files[0]
  calculateFileMd5(file).then((md5) => {
    console.info(md5)
    fileMd5 = md5
    fileMd5Span.innerHTML = md5
    console.timeEnd('开始计算文件MD5')
  })
}

function uploadFile() {
  var fileInput = document.getElementById('fileInput')
  var file = fileInput.files[0]
  if (!file) return
  if (!fileMd5) return

  //获取到文件
  let fileArr = this.sliceFile(file)
  //保存文件名称
  let fileName = file.name

  fileArr.forEach((e, i) => {
    //创建formdata对象
    let data = new FormData()
    data.append('totalNumber', fileArr.length)
    data.append('chunkSize', chunkSize)
    data.append('chunkNumber', i)
    data.append('md5', fileMd5)
    data.append('file', new File([e], fileName))
    upload(data)
  })
}

/**
 * 计算文件md5值
 */
// 主线程代码
function calculateFileMd5(file) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./md5-worker.js')
    worker.postMessage(file)
    worker.onmessage = (event) => {
      resolve(event.data)
      worker.terminate()
    }
    worker.onerror = (error) => {
      reject(error)
      worker.terminate()
    }
  })
}

function upload(data) {
  var xhr = new XMLHttpRequest()
  // 当上传完成时调用
  xhr.onload = function () {
    if (xhr.status === 200) {
      uploadResult.append('上传成功分片：' + data.get('chunkNumber') + '\t')
    }
  }
  xhr.onerror = function () {
    uploadResult.innerHTML = '上传失败'
  }
  // 发送请求
  xhr.open('POST', 'http://localhost:3000/uploadBig', true)
  xhr.send(data)
}

function checkFile() {
  var xhr = new XMLHttpRequest()
  // 当上传完成时调用
  xhr.onload = function () {
    if (xhr.status === 200) {
      checkFileRes.innerHTML = '检测文件完整性成功:' + xhr.responseText
    }
  }
  xhr.onerror = function () {
    checkFileRes.innerHTML = '检测文件完整性失败'
  }
  // 发送请求
  xhr.open('POST', '/checkFile', true)
  let data = new FormData()
  data.append('md5', fileMd5)
  xhr.send(data)
}

function sliceFile(file) {
  const chunks = []
  let start = 0
  let end
  while (start < file.size) {
    end = Math.min(start + chunkSize, file.size)
    chunks.push(file.slice(start, end))
    start = end
  }
  return chunks
}