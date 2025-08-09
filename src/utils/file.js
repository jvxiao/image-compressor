export const downloadFile = (url, filename='下载.jpg') => {
    const downloadElement = document.createElement('a')
    downloadElement.href = url
    downloadElement.download = filename // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
}