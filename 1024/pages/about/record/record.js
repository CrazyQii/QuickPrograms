// pages/about/record/record.js
import { formatDay } from '../../../utils/util'
import { post } from '../../../utils/request'
import { getLuckyList } from '../../../utils/apis'

Page({
  data: {
    'lucky_record': [
      // {
      //   'award_id': 1,
      //   'award_name': '奖品1',
      //   'luck_date': formatDay(new Date()),
      //   'draw_type': '普通',
      //   'status': '未发放'
      // },
      // {
      //   'award_id': 2,
      //   'award_name': '奖品2',
      //   'luck_date': formatDay(new Date),
      //   'draw_type': '普通',
      //   'status': '未发放'
      // },
      // {
      //   'award_id': -1,
      //   'award_name': '奖品1',
      //   'luck_date': formatDay(new Date),
      //   'draw_type': '普通',
      //   'status': '未发放'
      // }
    ],
    loading: false
  },

  onLoad() {
    this.setData({ loading: true })
    // 请求后端接口，拿取用户信息
    this.getLuckies().then(res => {
      if (res.length != 0) {
        res.forEach(element => {
          element['luckDate'] = formatDay(element['luckDate'])
        });
      }
      this.setData({
        'lucky_record': res
      })
    }).catch(err => {
      wx.showToast({
        title: '网络连接超时',
        icon: 'error',
        duration: 2000,
        mask: true
      })
      console.error(err)
    }).finally(() => {
      this.setData({ loading: false })
    })
  },

  /**
   * 获取奖品列表
   */
  getLuckies() {
    console.log("请求已获得奖品列表")
    return new Promise((resolve, reject) => {
      post(getLuckyList).then(res => {
        if (res.retno == 0) {
          console.log("获取奖品列表结果" + JSON.stringify(res))
          resolve(res.data)
        } else {
          reject("获取奖品列表失败：" + JSON.stringify(res))
        }
      })
    }).catch(err => {
      console.error("获取奖品列表失败：" + JSON.stringify(err))
    })
  }
})