// pages/lottery/result/result.js
Page({
  data: {
    'score': 2,
    'isLottery': true 
  },

  onLoad(options) {
    // 判断用户是否获得抽奖权力

  }, 

  /**
   * 
   */
  toLottery() {
    wx.reLaunch({
      url: '/pages/lottery/lottery/lottery',
    })
  },

  /**
   * 跳转首页
   */
  toIndex() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})