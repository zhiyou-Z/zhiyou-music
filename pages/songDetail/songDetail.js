// pages/songDetail/songDetail.js
import request from '../../utils/request'
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,//是否播放
    musicId: '',//音乐id
    musicIndex: '',//音乐的下标
    song: {},//音乐详情
    musicUrl: '',//音乐地址
    recommendListData: []
  },
  // 点击播放\暂停的回调
  musicPlay(){
    this.musicControl()
  },
  // 控制音乐的播放暂停函数
  musicControl(isPlay){
    this.setData({
      isPlay: isPlay? isPlay : !this.data.isPlay
    })
    if(this.data.isPlay){
      this.backgroundAudioManager.title = this.data.song.name
      console.log(this.data.musicUrl)
      this.backgroundAudioManager.src = this.data.musicUrl
      console.log(this.backgroundAudioManager.src)

      // this.InnerAudioContext.autoplay = true
      // this.InnerAudioContext.src = this.data.musicUrl
      // this.InnerAudioContext.onPlay(() => {
      //   console.log('开始播放')
      // })
    }else{
      this.backgroundAudioManager.pause()
      // this.InnerAudioContext.pause(() => {
      //   console.log('暂停')
      // })
    }
  },
  getMusicInfo(musicId){
    // 请求歌曲详情数据
    request('/song/detail',{ids: musicId}).then(res => {
      this.setData({
        song: res.songs[0]
      })
    }).catch(err => {
      console.log(err)
    })
    // 请求音乐文件地址
    request('/song/url',{id: musicId}).then(res => {
      this.setData({
        musicUrl: res.data[0].url
      })
      this.musicControl(true)
    })
    //监听音乐/播放/暂停/停止
    this.backgroundAudioManager.onPlay(()=>{
      this.musicControl(true)
      appInstance.globalData.isMusicPlay = true
      appInstance.globalData.musicId = this.data.musicId
    })
    this.backgroundAudioManager.onPause(()=>{
      this.setData({
        isPlay: false
      })
      appInstance.globalData.isMusicPlay = false
    })
    this.backgroundAudioManager.onStop(()=>{
      this.musicControl(false)
      appInstance.globalData.isMusicPlay = false
    })
    // 监听音乐自然播放结束事件
    this.backgroundAudioManager.onEnded(()=>{
      this.musicControl(false)
    })
  },
  // 切歌的函数
  handleSwitch(event){
    let type = event.currentTarget.id
    var index = this.data.musicIndex
    if(type === "next"){
      if(index + 1 < this.data.recommendListData.length){
        index += 1
      }
    }else{
      (index === 0) && (index = this.data.recommendListData.length)
      index -=1
    }
    this.setData({
      musicIndex: index * 1
    })
    let musicId = this.data.recommendListData[index].id
    this.getMusicInfo(musicId)
  },
  // 顺序播放
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //创建audio实例
    // this.InnerAudioContext = wx.createInnerAudioContext({
    //   useWebAudioImplement: false
    // })
    // 创建音乐播放实例
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    // 获取每日推荐传递过来的音乐id和音乐的下标
    this.setData({
      musicId: options.musicId,
      musicIndex: options.index * 1
    })
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === this.data.musicId){
      this.setData({
        isPlay: true
      })
    }
    // 页面通信，拿到每日推荐的列表
    let _this = this
    this.getOpenerEventChannel().on("getCartDatalist",data=>{
      _this.setData({
        recommendListData: data
      })
    })
    // 请求歌曲详细数据
    this.getMusicInfo(options.musicId)
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