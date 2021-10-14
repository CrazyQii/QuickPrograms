Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    partPage: [
      // {
      //   title: '见龙在田',
      //   name: '第一关',
      //   color: 'cyan'
      // },
      // {
      //   title: '飞龙在天',
      //   name: '第二关',
      //   color: 'blue'
      // },
      // {
      //   title: '鸿渐于陆',
      //   name: '第三关',
      //   color: 'purple'
      // },
      // {
      //   title: '龙跃在渊',
      //   name: '第四关',
      //   color: 'mauve'
      // },
      // {
      //   title: '羝羊触藩',
      //   name: '第五关',
      //   color: 'pink'
      // },
      // {
      //   title: '潜龙勿用',
      //   name: '第六关',
      //   color: 'brown'
      // },
      // {
      //   title: '亢龙有悔',
      //   name: '第七关',
      //   color: 'red'
      // }
    ],
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