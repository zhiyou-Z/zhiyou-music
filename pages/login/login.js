// pages/login/login.js
// 登录流程
// 1.手机表单数据
// 2.前端验证
//   验证账号密码是否合法
//   不通过就不需要请求后端
//   通过验证了，发请求给服务器
// 3.后端验证
//   验证用户是否存在
//   存在验证密码，返回前端数据
//   用户不存在返回给前端提示注册
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },
  // 获取输入框内容
  handleInput(event){
    let type = event.currentTarget.id//输入框对应的id
    this.setData({
      [type]: event.detail.value//输入框的value
    })
  },
  // 提交登陆按钮
  login(){
    let {phone, password} = this.data
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error'
      })
      return
    }
    // 验证手机号的正则
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(phoneReg.test(phone)){
    }else{
      wx.showToast({
        title: "手机号格式错误",
        icon: "error"
      })
      return
    }
    if(!password){
      wx.showToast({
        title: "密码不能为空",
        icon: "error"
      })
      return
    }
    wx.showToast({
      title: '正在登录……',
      icon: 'loading'
    })
    // 后端验证
    request('/login/cellphone', {phone, password}).then(res => {
      if(res.code === 200){
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
  // 将用户信息储存到本地
        wx.setStorageSync('userInfo',JSON.stringify(res.profile))
        wx.setStorage({
          key: 'token',
          data: res.token
        })
        console.log(res)
      }else if(res.code === 400){
        wx.showToast({
          title: '手机号未注册',
          icon: 'error'
        })
      }else{
        wx.showToast({
          title: '登陆失败，请检查账号密码',
          icon: 'error'
        })
        console.log(res)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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