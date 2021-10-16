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
    'partPage': Array
  },
  methods: {
    /**
     * 显示确认弹窗
     * @param {*} e 
     */
    showModal(e) {
      let couldAnswer = wx.getStorageSync('answerDetail')['couldAnswer']
      let index = Number(e.currentTarget.id)
      if (couldAnswer) { // 用户当天没有答题
        if (this.properties.itemId - 1 > index) { // 时间过期，没有弹窗功能
          return 
        } else if (this.properties.itemId - 1 == index) { // 当天题库
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
        if (this.properties.itemId - 1 > index) { // 时间过期，没有弹窗功能
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