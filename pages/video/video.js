// pages/video/video.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    navid: '',//记录当前导航条位置
    videoListData: [],
    isLogin: false,
    videoId: '',
    isTriggered: false,//标识下拉刷新是否成功
    isdata: false//是否拿到了视频列表的数据
  },
  // 跳转至登录页面
  toLogin(){
    wx.switchTab({
      url: '/pages/presonal/presonal'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData()
  },
// 请求导航数据
  getVideoGroupListData(){
    request('/video/group/list').then(res => {
      this.setData({
        videoGroupList: res.data.slice(0, 14),
        navid: res.data[0].id
      })
      this.getVideoListData(this.data.navid)
    })
  },
  //获取视频列表数据
  getVideoListData(navid){ 
    wx.hideLoading()
    request('/video/group', {id: navid}).then(res => {
      wx.hideLoading()
      if(res.code === 200){
        this.setData({
          videoListData: res.datas,
          isTriggered: false,
          isdata: true
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 事件委托
  navTap(event){
    this.setData({
      navid: event.target.id * 1
    })
    // 显示正在加载
    wx.showLoading({
      title: '加载中，请稍后……',
    })
    this.getVideoListData(this.data.navid)
  },
  // 点击/继续播放的回调函数
  // 处理多个视频同时播放的问题
  handlePlay(event){
    let vid = event.currentTarget.id
    this.vid!== vid && this.videoContext && this.videoContext.stop()
    this.vid = vid
    this.setData({
      videoId: vid
    })
    this.videoContext = wx.createVideoContext(vid)
  },

  // 下拉刷新
  handleRefresher(){
    this.getVideoListData(this.data.navid)
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
    if(this.data.navid && wx.getStorageSync('token')){
      console.log("1")
      if(!this.data.isdata){
        this.getVideoListData(this.data.navid)
      console.log("2")

      }
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