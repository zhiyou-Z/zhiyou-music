import request from '../../utils/request'

// pages/presonal/presonal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    islogin: false,//记录用户是否登录
    recentPlayList: []//用户播放记录
  },
  // 跳转至登录页面
  toLogin(){
    if(!this.data.islogin){
      wx.navigateTo({
      url: '/pages/login/login',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
      userInfo: JSON.parse(userInfo)
      })
    }
  },
  //获取用户播放记录
  getUserRecentPlayList(userId){
    request('/user/record', {uid:userId,'type':1}).then(res => {
      this.setData({
        recentPlayList: res.weekData
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 从本地存储中获取用户登录信息
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        islogin: true,
        userInfo: JSON.parse(userInfo)
      })
    }
    if(this.data.islogin && this.data.recentPlayList.length === 0){
      this.getUserRecentPlayList(this.data.userInfo.userId)
    }
    
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