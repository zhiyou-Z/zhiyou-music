import request from "./../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    personalized: [],
    toplist: []
  },
  // 跳转至每日推荐页面
  toRecommendSong(){
    wx.navigateTo({
      url:'/pages/recommendSong/recommendSong'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图图片请求
    request('/banner',{type: 2}).then(res => {
      this.setData({
        banners: res.banners
      })
    }).catch((err) => {
      console.log("轮播图数据获取失败",err)
    })

    // 推荐歌单请求
    request('/personalized',{limit: 10}).then(res => {
      this.setData({
        personalized: res.result
      })
    }).catch((err) => {
      console.log("推荐歌单获取失败",err)
    })

    // 排行榜数据请求
    let index = 0
    let data = []
    while(index < 5){
      request('/top/list', {idx: index}).then(res => {
        let toplistItem = {
          name: res.playlist.name,
          tracks: res.playlist.tracks.slice(0, 3)
        }
        data.push(toplistItem)
        this.setData({
        toplist: data
      })
      }).catch(err => {
        console.log("排行榜数据获取失败", err)
      })
      
      index++
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  //   wx.createSelectorQuery()
  //   .select('.recommendScroll')
  //   .node()
  //   .exec((res) => {
  //   console.log(res)
  //   const scrollView = res[0].node;
  //   scrollView.showScrollbar = false;
  //   scrollView.bounces = true
  // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})