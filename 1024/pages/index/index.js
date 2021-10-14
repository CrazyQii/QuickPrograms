import { post } from '../../utils/request'
import { partList, getUserCredit, getLevelList } from '../../utils/apis'
import { DateToTs } from '../../utils/util'

const app = getApp()

Page({
  data: {
    PageCur: 'lottery',
    partPage: [],
    userInfo: {},
    level: [],
    userLevel: {},
    itemId: '',
    loading: false,
    isOpenBigAward: false
  },
  onLoad() {
    this.setData({ 'loading': true })
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
  },

  // tab跳转，同时计算当前时间是否可以开奖
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    let startTime = DateToTs(wx.getStorageSync('answerDetail')['start-time'])
    let endTime = DateToTs(wx.getStorageSync('answerDetail')['end-time'])
    let now = DateToTs(new Date())
    if (now >= startTime && now <= endTime) {
      this.setData({ isOpenBigAward: true })
    } else {
      this.setData({ isOpenBigAward: false })
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
      })
    }).catch(err => {
      console.log("初始化用户界面失败" + JSON.stringify(err))
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
      console.log("初始化用户界面失败" + JSON.stringify(err))
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
          reject("查询用户当前级别失败：" + JSON.stringify(res))
        }
      })
    }).catch(err => {
      console.log("查询用户当前级别失败" + JSON.stringify(err))
    })
  }
})