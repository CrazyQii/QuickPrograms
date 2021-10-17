Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    partPage: [],
    index: '',
    modal: false
  },
  properties: {
    'itemId': Number,
    'partPage': Array,
    'couldAnswer': Boolean
  },
  methods: {
    /**
     * 显示确认弹窗
     * @param {*} e 
     */
    showModal(e) {
      let couldAnswer = this.properties.couldAnswer
      let token = wx.getStorageSync('token')
      if (token == null || token == '') { // 引导用户授权信息
        wx.showToast({
          title: '未登录',
          icon: 'error',
          duration: 1500,
          mask: true,
          success: res => {
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/about/home/home',
              })
            }, 1500)
          }
        })
        return
      }
      
      let index = Number(e.currentTarget.id)
      if (couldAnswer) { // 用户可以答题
        if (index + 1 < this.properties.itemId) { // 时间过期，没有弹窗功能
          return 
        } else if (this.properties.itemId == index + 1) { // 当天题库
          this.setData({
            modal: true,
            index: index
          })
        } else { // 时间未到，不开放题目
          wx.showToast({
            title: '时间未到',
            icon: 'error',
            duration: 1500,
            mask: true
          })
        }
      } else { // 用户当天已经答过题目
        if (index + 1 <= this.properties.itemId) { // 时间过期，没有弹窗功能
          return 
        } else { // 时间未到，不开放题目
          wx.showToast({
            title: '时间未到',
            icon: 'error',
            duration: 1500,
            mask: true
          })
        }
      }  
    },
    /**
     * 点击确认按钮，关闭弹窗，跳转页面
     */
    confirmModal() {
      this.setData({
        modal: false,
        index: ''
      })
      wx.redirectTo({
        url: '/pages/lottery/answer/answer?itemId=' + this.properties.itemId,
      })
    },
    /**
     *  点击取消按钮，关闭弹窗
     */
    cancelModal() {
      this.setData({
        modal: false,
        id: ''
      })
    }
  }
})