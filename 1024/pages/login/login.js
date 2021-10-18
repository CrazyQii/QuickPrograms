//index.js
//获取应用实例
import { post, get } from '../../utils/request'
import { getUserToken, postNewUserInfo, getUserInfo, postOpenUserInfo } from '../../utils/apis'

const app = getApp()

Page({
  data: {
    userInfo: {},
    hasOpenUserInfo: false,
    modal: false,
    modalInfo: '',
    loading: false,
    disableBtn: false
  },
  onLoad() {
    if (app.globalData.userInfo) { // 信息存在，跳转到主页，信息不存在，需要用户注册信息
      this.setData({ loading: true })
      this.login()
      .then(res => {
        return new Promise((resolve, reject) => {
          this.getToken(res).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      })
      .then(data => {
        return new Promise((resolve, reject) => {
          // 设置token缓存
          wx.setStorageSync('answerDetail', data)
          wx.setStorageSync('token', data.token)
          if (data.status != 0) { // 用户已经注册过，直接进入主界面
            this.getFullUserInfo()
            .then((res) => {
              // 本地存储用户信息
              wx.setStorageSync('userInfo', res)
              app.globalData.userInfo = res
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }).catch(err => {
              reject(err)
            })
          } else {  // 进入注册页面
            resolve()
          }
        })
      })
      .catch(err => {
        wx.showToast({
          title: '网络连接超时',
          icon: 'error',
          duration: 2000,
          mask: true
        })
        this.setData({ disableBtn: true })
        console.error(err)
      })
      .finally(() => {
        this.setData({ loading: false })
      })
    } else { // 信息不存在，注册用户信息 
      if (wx.getStorageSync('answerDetail')['status'] == 0) {
        return
      }
      this.setData({ loading: true })
      this.login()
      .then(res => {
        return new Promise((resolve, reject) => {
          this.getToken(res).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        }) 
      }).then(data => {
        return new Promise((resolve, reject) => {
          // 设置token缓存
          wx.setStorageSync('answerDetail', data)
          wx.setStorageSync('token', data.token)
          if (data.status != 0) { // 用户已经注册过，直接进入主界面
            this.getFullUserInfo()
            .then((res) => {
              // 本地存储用户信息
              wx.setStorageSync('userInfo', res)
              app.globalData.userInfo = res
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }).catch(err => {
              reject(err)
            })
          } else {  // 进入注册页面
            resolve()
          }
        })
      }).catch(err => {
        wx.showToast({
          title: '网络连接超时',
          icon: 'error',
          duration: 2000,
          mask: true
        })
        this.setData({ disableBtn: true })
        console.error(err)
      }).finally(() => {
        this.setData({ loading: false })
      })
    }
  },

  /**
   * 静默登录
   */
  login() {
    return new Promise((resolve, reject) => {
      // 静默登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log("静默登录成功，返回结果：" + JSON.stringify(res))
          resolve(res.code)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },

  /**
   * 获取token
   */
  getToken(code) {
    console.log("开始获取token")
    return new Promise((resolve, reject) => {
      let data = { 'code': code }
      get(getUserToken, data).then(res => {
        if (res.retno == 0) {
          console.log("token结果：" + JSON.stringify(res.data))
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject("获取token失败：" + JSON.stringify(err))
      })
    })
  },

  /**
   * 点击按钮，调用wx接口，请求用户权限，查询用户信息
   * @param {*} e 
   */
  getOpenUserInfo() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: e => {
        console.log("查询用户信息返回结果：" + JSON.stringify(e))
        let data = {
          'nickname': e.userInfo.nickName,
          'avatar': e.userInfo.avatarUrl
        }
        post(postOpenUserInfo, data).then(res => {
          if (res.retno == 0) {
            console.info("上传头像和昵称结果：" + JSON.stringify(res))
            // 字典键修改,更新格式
            let userInfo = e.userInfo
            userInfo['nickname'] = userInfo['nickName']
            userInfo['avatar'] = userInfo['avatarUrl']
            delete userInfo['nickName']
            delete userInfo['avatarUrl']
            this.setData({
              userInfo: userInfo,
              hasOpenUserInfo: true
            })
          } else {
            console.error("上传头像和昵称错误：" + JSON.stringify(res))
          } 
        }).catch(err => {
          console.error("上传头像和昵称错误：" + JSON.stringify(err))
        }) 
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }, fail: e => {
        wx.showToast({
          title: '请授权操作',
          icon: 'error',
          duration: 2000,
          mask: true
        })
      }
    })
  },

  /**
   * 获取用户所有有效信息
   */
  getFullUserInfo() {
    console.log("开始获取用户所有有效信息")
    return new Promise((resolve, reject) => {
      post(getUserInfo).then(res => {
        console.log("用户所有有效信息结果：" + JSON.stringify(res))
        if (res.retno == 0) {
          resolve(res.data)
        } else {
          reject("获取用户所有有效信息错误：" + JSON.stringify(res))
        }
      }).catch(err => {
        console.error("获取用户所有有效信息错误：" + JSON.stringify(err))
        reject(err)
      })
    })
  },

  /**
   * 领奖联系人登记注册
   * @param {*} e 
   */
  register(e) {
    console.log(e)
    // 校验参数是否正确
    if (e.detail.value.concat.trim() == '' || e.detail.value.concat == null || 
    e.detail.value.mobile.trim() == '' || e.detail.value.mobile == null || 
    e.detail.value.depart.trim() == '' || e.detail.value.depart == null) {
      this.showModal('个人信息不能为空')
      return
    } 
    let reg = /^1[3-9]\d{9}$/
    if(!reg.test(e.detail.value.mobile.trim())){ 
      this.showModal("手机号码有误，请重填");  
      return; 
    }
    
    // 整合用户数据
    let userInfo = this.data.userInfo
    userInfo.concat = e.detail.value.concat
    userInfo.mobile = e.detail.value.mobile
    userInfo.depart = e.detail.value.depart

    let data = {
      'concat': userInfo['concat'],
      'mobile': userInfo['mobile'],
      'depart': userInfo['depart']
    }

    this.setData({ loading: true })
    this.postNewUserInfo(data).then(res => {
      // 请求成功，返回用户数据，并保存在本地
      wx.setStorage({
        key: 'userInfo',
        data: userInfo,
        success: () => {
          app.globalData.userInfo = userInfo
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
        wx.showToast({
          title: '网络连接超时',
          icon: 'error',
          duration: 2000,
          mask: true
        })
      console.error(err)
    }).finally(() => {
      this.setData({ loading: false })
    })
  },

  /**
   * 后端提交用户数据
   */
  postNewUserInfo(data) {
    console.log("开始提交用户注册数据")
    return new Promise((resolve, reject) => {
      // 向后端发起请求
      post(postNewUserInfo, data).then(res => {
        if (res.retno == 0) {
          console.log("提交用户注册数据返回结果：" + JSON.stringify(res))
          resolve(res)
        } else {
          reject("提交数据用户数据失败：" + JSON.stringify(res))
        }
      }).catch(err => {
        reject("提交数据用户数据失败：" + JSON.stringify(err))
      })
    })
  },

  /**
   * 部门下拉框选择
   */
  changeDepart(e) {
    this.setData({
      depart: e.detail.value
    })
    console.log(this.data.depart)
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
