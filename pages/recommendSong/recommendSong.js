// pages/recommendSong.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendListData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户是否登陆
    if(!wx.getStorageSync('userInfo')){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: ()=>{
          wx.switchTab({
            url: '/pages/presonal/presonal'
          })
        }
      })
    }
    this.getRecommendListData()    
  },
  getRecommendListData(){
    // 获取每日推荐歌曲数据
    request('/recommend/songs').then(res =>{
      this.setData({
        recommendListData : res.recommend
      })
    })
  },
  clickPlay(event){
    // 通过路由跳转实现组件通信，传递音乐id
    let _this = this
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?musicId=' + event.currentTarget.dataset.id + '&index=' + event.currentTarget.dataset.index,
      success(res){
        res.eventChannel.emit("getCartDatalist", _this.data.recommendListData)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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