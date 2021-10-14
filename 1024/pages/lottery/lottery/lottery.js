import { post } from '../../../utils/request'
import { postAwardList, postAwardResult } from '../../../utils/apis'

Page({
  data: {
    awardsList: {},  // 奖品列表
    animationData: {},  // 动画数据
    lotteryTimes: 1, // 抽奖次数
    awardId: -1,  // 奖盘索引
    btnDisabled: '',  // 抽奖按钮
    runDegs: 0, // 旋转角度==生成抽奖概率
    runNum: 8, // 转盘旋转次数
    loading: false,
    // awardsConfig: { // 获取奖品配置
    //     chance: true,
    //     awards:[
    //       {'index': 0, 'name': '1元红包', 'id': 1},
    //       {'index': 1, 'name': '5元话费', 'id': 2},
    //       {'index': 2, 'name': '6元红包', 'id': 3},
    //       {'index': 3, 'name': '8元红包', 'id': 4},
    //       {'index': 4, 'name': '10元话费', 'id': 5},
    //       {'index': 5, 'name': '10元红包', 'id': 6}
    //     ]
    // }  
    awardsConfig: {}
  },
  /**
   * 页面加载，初始化奖盘
   */
  onLoad() {
    this.setData({ loading: true })
    this.getAwardList()
    .then(res => {  // 配置信息
      let awardsConfig = {
        chance: true,
        awards: res
      }
      this.setData({ awardsConfig: awardsConfig })
    })
    .then(() => {
      return new Promise((resolve, reject) => { // 初始化奖盘
        this.init().then(() => {
          resolve()
        })
      })
    }).catch(err => {
      wx.showToast({
        title: '抽奖转盘生成失败',
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
   * 初始化奖盘
   */
  init() {
    return new Promise((resolve, reject) => {
      // 绘制转盘
      let awards = this.data.awardsConfig.awards,
      len = awards.length,
      rotateDeg = 360 / len / 2 + 90,
      html = [],
      turnNum = 1 / len  // 文字旋转 turn 值
      this.setData({
        btnDisabled: this.data.awardsConfig.chance ? '' : 'disabled'  
      })
      var ctx = wx.createContext()
      for (var i = 0; i < len; i++) {
        // 保存当前状态
        ctx.save();
        // 开始一条新路径
        ctx.beginPath();
        // 位移到圆心，下面需要围绕圆心旋转
        ctx.translate(150, 150);
        // 从(0, 0)坐标开始定义一条新的子路径
        ctx.moveTo(0, 0);
        // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
        ctx.rotate((360 / len * i - rotateDeg) * Math.PI/180);
        // 绘制圆弧
        ctx.arc(0, 0, 150, 0,  2 * Math.PI / len, false);
        // 颜色间隔
        if (i % 2 == 0) {
            ctx.setFillStyle('rgba(255,184,32,.1)');
        }else{
            ctx.setFillStyle('rgba(255,203,63,.1)');
        }
        // 填充扇形
        ctx.fill();
        // 绘制边框
        ctx.setLineWidth(0.5);
        ctx.setStrokeStyle('rgba(228,55,14,.1)');
        ctx.stroke();

        // 恢复前一个状态
        ctx.restore();

        // 奖项列表
        html.push({turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awards[i].name});    
      }
      this.setData({
        awardsList: html
      })
      resolve()
    })
  },

  /**
   * 加载奖品列表
   */
  getAwardList() {
    console.log("加载奖品列表")
    return new Promise((resolve, reject) => {
      post(postAwardList).then(res => {
        if (res.retno == 0) {
          console.log("加载奖品列表结果：" + JSON.stringify(res))
          resolve(res.data)
        } else {
          reject("加载奖品列表错误:" + JSON.stringify(res))
        }
      }).catch(err => {
        reject("加载奖品列表错误: " + JSON.stringify(err))
      })
    })
  },

  /**
   * 动画抽奖逻辑
   */
  getLottery() {
    console.log("开始抽奖")
    let that = this
    // 获取抽奖次数、奖品配置、转盘旋转次数、旋转角度
    let awardId = wx.getStorageSync('lottery')['awardId'],
      lotteryTimes = this.data.lotteryTimes,
      awardsConfig = this.data.awardsConfig,
      runNum = this.data.runNum,
      runDegs = this.data.runDegs

    // 生成中奖索引
    // awardIndex = Math.round(Math.random()* 6);
    let awardIndex = -1
    awardsConfig.awards.forEach((item, index) => {
      if (item['id'] == awardId) awardIndex = index
    })

    // 旋转抽奖
    runDegs = runDegs + (360 - runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))

    // 创建动画
    var animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(runDegs).step()
    that.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    })

    // 记录奖品
    let award = {
      'awardId': awardsConfig.awards[awardIndex]['id'],
      'awardName': awardsConfig.awards[awardIndex]['name'],
      'drawId': wx.getStorageSync('lottery')['drawId'],
      'answerId': wx.getStorageSync('lottery')['answerId']
    }
    console.log("展示抽奖结果：" + JSON.stringify(award))
    this.postAwardResult(award)
    .then(() => {
      let that = this
      // 中奖提示
      setTimeout(function() {
        wx.showModal({
          title: '恭喜',
          content: '获得' + (awardsConfig.awards[awardIndex].name) + ', 已放入您的背包中',
          showCancel: false,
          success: () => {
            // 记录抽奖次数
            that.setData({ lotteryTimes: lotteryTimes - 1 })
            if (that.data.lotteryTimes <= 0) { // 抽奖次数使用完毕
              awardsConfig.chance = false
            }
            if (awardsConfig.chance) {
              that.setData({
                btnDisabled: ''
              }) 
            } else {
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          }
        })
      }, 4000);
    }).catch(err => {
      wx.showToast({
        title: '上传中奖结果失败',
        icon: 'error',
        duration: 2000,
        mask: true
      })
      console.error(err)
    })
  },

  /**
   * 上传抽奖结果
   */
  postAwardResult(data) {
    console.log("上传抽奖结果")
    return new Promise((resolve, reject) => {
      post(postAwardResult, data).then(res => {
        if (res.retno == 0) {
          console.log("上传抽奖结果：" + JSON.stringify(res))
          resolve(res.data)
        } else {
          reject("上传抽奖结果失败：" + JSON.stringify(res))
        }
      })
    }).catch(err => {
      reject("上传抽奖结果失败：" + JSON.stringify(err))
    }) 
  }
})
