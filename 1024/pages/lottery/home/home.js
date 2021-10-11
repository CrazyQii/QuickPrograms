Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
        title: '见龙在田',
        name: '第一关',
        id: '1',
        color: 'cyan'
      },
      {
        title: '飞龙在天',
        name: '第二关',
        id: '2',
        color: 'blue'
      },
      {
        title: '鸿渐于陆',
        name: '第三关',
        color: 'purple',
        id: '3'
      },
      {
        title: '龙跃在渊',
        name: '第四关',
        color: 'mauve',
        id: '4'
      },
      {
        title: '羝羊触藩',
        name: '第五关',
        color: 'pink',
        id: '5'
      },
      {
        title: '潜龙勿用',
        name: '第六关',
        color: 'brown',
        id: '6'
      },
      {
        title: '亢龙有悔',
        name: '第七关',
        color: 'red',
        id: '7'
      }
    ],
    index: '',
    modal: false
  },
  methods: {
    /**
     * 显示确认弹窗
     * @param {*} e 
     */
    showModal(e) {
      this.setData({
        modal: true,
        index: e.currentTarget.id
      })
    },
    /**
     * 点击确认按钮，关闭弹窗，跳转页面
     */
    confirmModal() {
      let id = this.data.elements[this.data.index]['id']
      this.setData({
        modal: false,
        index: ''
      })
      wx.redirectTo({
        url: '/pages/lottery/answer/answer?id=' + id,
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