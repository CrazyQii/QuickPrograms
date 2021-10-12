const app = getApp()

Page({
  data: {
    PageCur: 'lottery'
  },
  onLoad() {
    console.log(app.globalData.userInfo)
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  }
})