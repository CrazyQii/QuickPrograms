const app = getApp()

Page({
  data: {
    PageCur: 'lottery',
    userInfo: {}
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log("加载缓存信息：" + JSON.stringify(this.data.userInfo))
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  }
})