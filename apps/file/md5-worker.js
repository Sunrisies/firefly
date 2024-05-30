self.onmessage = function(event) {
  const fileArrayBuffer = event.data;
  const arrayBuffer = fileArrayBuffer.slice(0); // 创建ArrayBuffer的一个副本

  // 将 ArrayBuffer 转换为 Blob
  const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });

  // 使用 FileReader 读取 Blob 为 ArrayBuffer
  const reader = new FileReader();
  reader.onload = function(e) {
    // 计算 MD5
    calculateMD5(e.target.result)
      .then(fileMd5 => {
        self.postMessage(fileMd5);
      })
      .catch(error => {
        console.error('MD5 calculation failed:', error);
      });
  };
  reader.readAsArrayBuffer(blob);
};

function calculateMD5(arrayBuffer) {
  return crypto.subtle.digest('MD5', arrayBuffer)
    .then(hashArrayBuffer => {
      // 将 ArrayBuffer 转换为十六进制字符串
      const hashArray = Array.from(new Uint8Array(hashArrayBuffer));
      const fileMd5 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return fileMd5;
    })
    .catch(error => {
      throw new Error('Unable to calculate MD5. Error: ' + error);
    });
}