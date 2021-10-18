//index.js

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    userInfo: Object,
    level: Array,
    userLevel: Object,
    isOpenBigAward: Boolean,
    isOver: Boolean,
    last: Boolean,
    startTime: String,
    endTime: String,
    login: Boolean
  },
  data: {
    level: []
  },
  methods: {
    /**
     * 抽奖按钮
     */
    lottery() {
      wx.redirectTo({
        url: '/pages/lottery/lottery/lottery?lastLottery=' + true,
      })
    }
  }
})
