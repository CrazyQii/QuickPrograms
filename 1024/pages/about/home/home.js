//index.js
import { formatTime } from '../../../utils/util'

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    userInfo: Object
  },
  data: {
    scroll: 0,
    level: [
      {
        'name': '第一级',
        'grade': 10,
        'lvcode': 1
      },
      {
        'name': '第二级',
        'grade': 15,
        'lvcode': 2
      },
      {
        'name': '第三级',
        'grade': 20,
        'lvcode': 3
      },
      {
        'name': '第四级',
        'grade': 25,
        'lvcode': 4
      },
      {
        'name': '第五级',
        'grade': 30,
        'lvcode': 5
      }
    ],
    grade: 0,
    level_name: '第一级',
    open_time: formatTime(new Date())
  },
  methods: {
    /**
     * 抽奖按钮
     */
    lottery() {
      wx.navigateTo({
        url: '/pages/lottery/lottery/lottery',
      })
    }
  }
})
