//index.js
//获取应用实例
import { post } from '../../utils/request'
import { user } from '../../utils/apis'

const app = getApp()

Page({
  data: {
    userInfo: {},
    hasOpenUserInfo: false,
    modal: false,
    modalInfo: '',
    loading: false
  },
  onLoad() {
    if (app.globalData.userInfo) { // 信息存在，跳转到主页，信息不存在，需要用户注册信息
      wx.reLaunch({
        url: '/pages/index/index',
      }) 
    } else { // 信息不存在，注册用户信息 
      this.getOpenId().then(res => {
        console.log(res)
        // 拿到openId，进行逻辑处理
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.setData({ loading: false })
      })
    }
    
  },

  /**
   * 获取openId
   */
  getOpenId() {
    return new Promise((resolve, reject) => {
      this.setData({ loading: true })
      let data = {
        'code': wx.getStorageSync('code')
      }
      post(user, data).then(res => {
        resolve(res)
      }).catch(err => {
        wx.showToast({
          title: '网络连接超时',
          icon: 'error',
          duration: 2000
        })
        reject("获取openid失败：" + JSON.stringify(err))
      })
    })
  },

  /**
   * 调用wx接口，请求用户权限，查询用户信息
   * @param {*} e 
   */
  getOpenUserInfo() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: res => {
        console.log("查询用户信息成功，返回结果：" + JSON.stringify(res))
        this.setData({
          userInfo: res.userInfo,
          hasOpenUserInfo: true
        })
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },

  /**
   * 领奖联系人登记注册
   * @param {*} e 
   */
  register(e) {
    this.setData({ loading: true })
    this.postUserInfo().then(res => {
      wx.setStorage({
        key: 'userInfo',
        data: res,
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log("本地缓存用户信息成功")
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, fail: err => {
          console.log("本地缓存用户信息失败")
          console.error(err)
        }
      })
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      this.setData({ loading: false })
    })
  },

  /**
   * 后端提交用户数据
   */
  postUserInfo() {
    return new Promise((resolve, reject) => {
      // 校验参数是否正确
      if (e.detail.value.userName.trim() == '' || e.detail.value.userName == null || 
      e.detail.value.mobile.trim() == '' || e.detail.value.mobile == null || 
      e.detail.value.apartment.trim() == '' || e.detail.value.apartment == null) {
        this.showModal('个人信息不能为空')
        return
      } 
      let reg = /^1[3-9]\d{9}$/
      if(!reg.test(e.detail.value.mobile.trim())){ 
        this.showModal("手机号码有误，请重填");  
        return false; 
      } 
      // 整合用户数据
      let userInfo = this.data.userInfo
      userInfo['userName'] = e.detail.value.userName
      userInfo['mobile'] = e.detail.value.mobile
      userInfo['apartment'] = e.detail.value.apartment

      // 向后端发起请求
      post().then(res => {
        resolve(res)
      }).catch(err => {
        wx.showToast({
          title: '网络连接超时',
          icon: 'error',
          duration: 2000
        })
        reject("提交数据用户数据失败：" + JSON.stringify(err))
      })
    })
  },

  /**
   * 显示确认弹窗
   * @param {*} modalInfo 
   */
  showModal(modalInfo) {
    this.setData({
      modal: true,
      modalInfo: modalInfo
    })
  },

  /**
   *  点击取消按钮，关闭弹窗
   */
  cancelModal() {
    this.setData({
      modal: false
    })
  }
})
