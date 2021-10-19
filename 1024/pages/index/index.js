import { post, get } from '../../utils/request'
import { partList, getUserCredit, getLevelList, getUserStatus, getTimeStatus, getUserToken } from '../../utils/apis'
import { DateToTs } from '../../utils/util'

const app = getApp()

Page({
  data: {
    PageCur: 'lottery',
    partPage: [],
    userInfo: {},
    level: [],
    userLevel: {},
    loading: false,
    last: wx.getStorageSync('last') || false,
    startTime: wx.getStorageSync('answerDetail')['start-time'],
    endTime: wx.getStorageSync('answerDetail')['end-time'],
    login: false,
    itemId: wx.getStorageSync('answerDetail')['itemId'],
    couldAnswer: wx.getStorageSync('answerDetail')['couldAnswer']
  },

  onLoad(option) {
    console.log('000' + JSON.stringify(option))
    if (!wx.getStorageSync('token')) {  // 用户信息不存在，单独加载展示页面
      this.setData({ 
        loading: true,
        login: false
      })
      this.initPartPage().then(res => { // 初始化关卡
        res.forEach((item, index) => {
          item['title'] = '第' + (index + 1) + '关'
          item['color'] = app.globalData.colorList[index]['name']
        })
        this.setData({ partPage: res })
      }).then((res) => { // 初始化用户等级界面
        return new Promise((resolve, reject) => {
          this.initUserPage().then((res) => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
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
    } else { 
      // if (wx.getStorageSync('answerDetail')['status'] == 0) {
      //   wx.navigateTo({
      //     url: '/pages/login/login',
      //   })
      //   return 
      // }


      // if (typeof(option) option['login'] != 'true') {
      //   this.login()
      //   .then(res => {
      //     return new Promise((resolve, reject) => {
      //       this.getToken(res).then(res => {
      //         resolve(res)
      //       }).catch(err => {
      //         reject(err)
      //       })
      //     })
      //   }).then(data => {
      //     wx.setStorageSync('answerDetail', data)
      //     wx.setStorageSync('token', data.token)
      //   }).catch(err => {
      //     console.error(err)
      //   })
      // }

      this.setData({ 
        'loading': true,
        'last': option['last'] || wx.getStorageSync('last') || false,
        'startTime': wx.getStorageSync('answerDetail')['start-time'],
        'endTime': wx.getStorageSync('answerDetail')['end-time'],
        'login': true
      })
      this.initPartPage().then(res => { // 初始化关卡
        res.forEach((item, index) => {
          item['title'] = '第' + (index + 1) + '关'
          item['color'] = app.globalData.colorList[index]['name']
        })
        this.setData({ partPage: res })
      }).then((res) => { // 初始化用户等级界面
        return new Promise((resolve, reject) => {
          this.initUserPage().then((res) => {
            resolve(res)
          }).catch(err => {
            reject(res)
          })
        })
      }).then(res => {
        this.setData({ level: res})
      }).then(() => { // 加载用户等级
        return new Promise((resolve, reject) => {
          this.getUserDegree().then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }).then(res => {
        this.setData({ userLevel: res})
      }).then(res => {
        return new Promise((resolve, reject) => {
          this.getStatus().then(data => {
            return new Promise((resolve, reject) => {
              let answerDetail = wx.getStorageSync('answerDetail')
              answerDetail['couldAnswer'] = data.couldAnswer
              answerDetail['itemId'] = data.itemId
              wx.setStorageSync('answerDetail', answerDetail)
              this.setData({ 
                itemId:data.itemId,
                couldAnswer: data.couldAnswer
              })
              resolve()
            })
          }).catch(err => {
            reject(err)
          })
          resolve()
        })
      }).then(res => {
        // 加载缓存
        this.setData({ loading: true })
        let itemId = wx.getStorageSync('answerDetail')['itemId']
        if (itemId == '') itemId = 1 // 默认从第一天开始
        this.setData({
          userInfo: wx.getStorageSync('userInfo'),
          itemId: Number(itemId)
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
    }  
  },

  onShow() {
    // console.log('213' + JSON.stringify())
    // if (typeof(option) != undefined) { // 从登录页跳转过来不需要执行
    //   return 
    // }
    // console.log(123)
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
        wx.setStorageSync('answerDetail', data)
        wx.setStorageSync('token', data.token)
      }).catch(err => {
        console.error(err)
      })
  //   this.onLoad()
  },

  // onHide() {
  //   this.onLoad()
  // },

  // tab跳转，同时计算当前时间是否可以开奖
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    if (wx.getStorageSync('answerDetail')['status'] == 0) return
    // 判断用户之前是否登录过，更新用户做题状态
    if (wx.getStorageSync('token') && this.data.PageCur == 'lottery') {
      this.onShow()
      this.setData({ loading: true })
      this.getStatus().then(data => {
        return new Promise((resolve, reject) => {
          let answerDetail = wx.getStorageSync('answerDetail')
          answerDetail['couldAnswer'] = data.couldAnswer
          answerDetail['itemId'] = data.itemId
          wx.setStorageSync('answerDetail', answerDetail)
          this.setData({ 
            itemId:data.itemId,
            couldAnswer: data.couldAnswer
          })
          resolve()
        })
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        this.setData({ loading: false})
      })
    }
    if (wx.getStorageSync('token') && this.data.PageCur == 'about') {
      this.setData({ 
        loading: true,
        last: wx.getStorageSync('last')
      })
      this.getUserDegree().then((res) => {
        this.setData({ userLevel: res})
      })
      this.getOpenTime().then(res => {
        let answerDetail = wx.getStorageSync('answerDetail')
        answerDetail['start-time'] = res['start-time']
        answerDetail['end-time'] = res['end-time']
        answerDetail['isStart'] = res['isStart']
        wx.setStorageSync('answerDetail', answerDetail)
        this.setData({
          startTime: answerDetail['start-time'],
          endTime: answerDetail['end-time'],
          isOpenBigAward: answerDetail['isStart']
        })
      })
      .then(() => {
        // 大奖时间参数设置
        let startTime = DateToTs(wx.getStorageSync('answerDetail')['start-time'])
        let endTime = DateToTs(wx.getStorageSync('answerDetail')['end-time'])
        
        let now = (new Date()).getTime()
        // console.log(startTime)
        // console.log(endTime)
        // console.log(now)
        if (now >= startTime && now <= endTime) {
          this.setData({ isOpenBigAward: true })
        } else {
          if (now > endTime) {
            this.setData({ 
              isOpenBigAward: false,
              isOver: true // 活动已结束
            })
          } else if (now < startTime) {
            this.setData({ 
              isOpenBigAward: false,
              isOver: false // 活动未开始
            })
          }
        }
      })
      .catch(err => {
        console.error(err)
      }).finally(() => {
        this.setData({ loading: false })
      })
    }
  },

  /**
   * 关卡用户界面
   */
  initPartPage() {
    console.log("初始化关卡界面")
    return new Promise((resolve, reject) => {
      post(partList).then(res => {
        if (res.retno == 0) {
          console.log("初始化关卡界面结果" + JSON.stringify(res))
          resolve(res.data)
        } else {
          reject("初始化关卡界面失败：" + JSON.stringify(res))
        }
      }).catch(err => {
        reject("初始化用户界面失败" + JSON.stringify(err))
      })
    })
  },

  /**
   * 初始化用户界面
   */
  initUserPage() {
    console.log("初始化用户界面")
    return new Promise((resolve, reject) => {
      post(getLevelList).then(res => {
        if (res.retno == 0) {
          console.log("初始化用户界面结果" + JSON.stringify(res))
          resolve(res.data)
        } else {
          reject("初始化用户界面失败：" + JSON.stringify(res))
        }
      })
    }).catch(err => {
      reject("初始化用户界面失败" + JSON.stringify(err))
    })
  },

  /**
   * 查询用户当前级别
   */
  getUserDegree() {
    console.log("查询用户当前级别")
    return new Promise((resolve, reject) => {
      post(getUserCredit).then(res => {
        if (res.retno == 0) {
          console.log("查询用户当前级别结果" + JSON.stringify(res))
          resolve(res.data)
        } else {
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
            wx.setStorageSync('answerDetail', data)
            wx.setStorageSync('token', data.token)
            resolve()
          }).catch(err => {
            reject(err)
          }) 
        }
      }).catch(err => {
        reject("查询用户当前级别失败" + JSON.stringify(err))
      })
    })
  },

  /**
   * 获取Status
   */
  getStatus() {
    console.log("开始获取答题关卡Status")
    return new Promise((resolve, reject) => {
      post(getUserStatus).then(res => {
        if (res.retno == 0) {
          console.log("获取答题关卡状态结果：" + JSON.stringify(res.data))
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject("获取答题关卡状态失败：" + JSON.stringify(err))
      })
    })
  },

  /**
   * 获取大奖更新时间
   */
  getOpenTime() {
    console.log("开始获取开奖时间Status")
    return new Promise((resolve, reject) => {
      post(getTimeStatus).then(res => {
        if (res.retno == 0) {
          console.log("获取开奖时间状态结果：" + JSON.stringify(res.data))
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject("获取开奖时间状态失败：" + JSON.stringify(err))
      })
    })
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
})