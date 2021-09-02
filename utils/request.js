// 网络模块
export default (url, data={}, method='GET') => {
  let baseurl = 'http://192.168.31.58:3000' 
  return new Promise((resolve, reject) => {
    wx.request({
      url : baseurl + url,
      data,
      method,
      timeout: 10000,
      header: {
        cookie: `MUSIC_U=${wx.getStorageSync('token')}; Max-Age=1296000; Expires=Sat 21 Aug 2021 12:05:01 GMT; Path=/;`
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }

    })
  })
}