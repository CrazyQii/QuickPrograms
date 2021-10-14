// pages/lottery/result/result.js
Page({
  data: {
    'lottery': {}
  },

  onLoad() {
    // 判断用户是否获得抽奖权力
    this.setData({
      'lottery': wx.getStorageSync('lottery')
    })
  }, 

  /**
   * 跳转抽奖页面
   */
  toLottery() {
    wx.redirectTo({
      url: '/pages/lottery/lottery/lottery',
    })
  },

  /**
   * 跳转首页
   */
  toIndex() {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})