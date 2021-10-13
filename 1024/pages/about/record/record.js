// pages/about/record/record.js
import { formatDay } from '../../../utils/util'

Page({
  data: {
    'lucky_record': [
      {
        'award_id': 1,
        'award_name': '奖品1',
        'luck_date': formatDay(new Date()),
        'draw_type': '普通',
        'status': '未发放'
      },
      {
        'award_id': 2,
        'award_name': '奖品2',
        'luck_date': formatDay(new Date),
        'draw_type': '普通',
        'status': '未发放'
      },
      {
        'award_id': -1,
        'award_name': '奖品1',
        'luck_date': formatDay(new Date),
        'draw_type': '普通',
        'status': '未发放'
      }
    ]
  },

  onLoad(options) {
    // 请求后端接口，拿取用户信息
  },
})