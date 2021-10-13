//app.js
App({
  onLaunch: function() {
    // 静默登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("静默登录成功，返回结果：" + JSON.stringify(res))
      }
    })
    // 获取用户授权信息
    // 查询本地是否有缓存，如果有缓存，自动登录，若没有缓存，请求后端接口查询用户信息
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        console.log(res)
        this.globalData.userInfo = res.data
        console.log("用户登录成功")
      }, fail: err => {
        console.log("本地缓存用户信息不存在，发起后端请求")
        console.error(err)
      }, complete () {
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
    })

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    host: 'http://150.223.204.125:4443/'
    // host: 'http://150.223.204.125:4443/'
  }
})