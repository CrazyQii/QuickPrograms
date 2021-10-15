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
    noStartAndOverDue: Boolean,
    last: Boolean,
    startTime: String,
    endTime: String
  },
  data: {
    level: [
      // {
      //   'name': '第一级',
      //   'grade': 10,
      //   'lvcode': 1
      // },
      // {
      //   'name': '第二级',
      //   'grade': 15,
      //   'lvcode': 2
      // },
      // {
      //   'name': '第三级',
      //   'grade': 20,
      //   'lvcode': 3
      // },
      // {
      //   'name': '第四级',
      //   'grade': 25,
      //   'lvcode': 4
      // },
      // {
      //   'name': '第五级',
      //   'grade': 30,
      //   'lvcode': 5
      // }
    ]
  },
  methods: {
    /**
     * 抽奖按钮
     */
    lottery() {
      wx.navigateTo({
        url: '/pages/lottery/lottery/lottery?last=true',
      })
    }
  }
})
