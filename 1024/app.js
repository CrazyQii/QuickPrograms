//app.js

App({
  onLaunch: function() {
    // 获取用户授权信息
    // 查询本地是否有缓存，如果有缓存，自动登录，若没有缓存，请求后端接口查询用户信息
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.globalData.userInfo = res.data
        console.log("用户登录成功: " + JSON.stringify(res))
      }, fail: err => {
        console.log("本地缓存用户信息不存在，发起后端请求")
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

    // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
    const updateManager = wx.getUpdateManager()
    
    updateManager.onCheckForUpdate( function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    
    updateManager.onUpdateReady( function () {
      wx.showModal({
        title: '更新提示' ,
        content: '新版本已经准备好，是否马上重启小程序？' ,
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    
    updateManager.onUpdateFailed( function () {
      // 新的版本下载失败
      wx.showToast({
        title: '新版本下载失败',
        icon: 'error',
        duration: 2000,
        mask: true
      })
    })
  },
  globalData: {
    userInfo: null,
    // host: 'https://www.crazyqiqi.top', // 服务器
    host: 'http://139.9.85.41:9090/', // 测试服务器
    colorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
  ]
  }
})