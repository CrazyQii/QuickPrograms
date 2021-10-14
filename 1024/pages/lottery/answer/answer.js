// pages/lottery/answer/answer.js
import { post } from '../../../utils/request'
import { quizList, putResult } from '../../../utils/apis'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentQuesIndex: 1, // 当前第几题
    questions: [],
    answers: [],
    btnShake: false,
    loading: false,
    time: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // this.setData({
    //   questions: {
    //     'list': [
    //       {
    //         'content': '213',
    //         'opta': 'a',
    //         'optb': 'b',
    //         'optc': 'c',
    //         'optd': 'd',
    //         'yes': 2
    //       },
    //       {
    //         'content': '213',
    //         'opta': 'a',
    //         'optb': 'b',
    //         'optc': 'c',
    //         'optd': 'd',
    //         'yes': 2
    //       }
    //     ]
    //   }
    // })
    // this.timer()
    this.setData({ loading: true })
    this.getQuestions(option.itemId)
    .then(res => {
      this.setData({
        questions: res
      })
    }).catch(err => {
      wx.showToast({
        title: '网络连接超时',
        icon: 'error',
        duration: 2000,
        mask: true
      })
      console.error(err)
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }, 2000)
    }).finally(() => {
      this.setData({ loading: false })
    })
  },

  /**
   * 查询题目列表
   */
  getQuestions(itemId) {
    console.log("开始请求后端，查询题目列表")
    return new Promise((resolve, reject) => {
      let data = {
        'itemId': itemId
      }
      post(quizList, data).then(res => {
        if (res.retno == 0) {
          console.log("查询题目列表结果：" + JSON.stringify(res))
          resolve(res.data)
        } else {
          reject("查询题目列表失败: " + JSON.stringify(res))
        }
      }).catch(err => {
        reject("查询题目列表失败：" + err)
      })
    })
  },

  /**
   * 切换题目显示
   */
  nextQues() {
    // 校验当前题目是否选择单选框
    if (this.data.answers.length != this.data.currentQuesIndex) { // 未选择
      this.setData({ btnShake: true })
    } else if (this.data.currentQuesIndex == this.data.questions.list.length) { 
      this.setData({ loading: true })
      this.postAnswer().then(res => {
        // 更新当日答题限制数据
        let answerDetail = wx.getStorageSync('answerDetail')
        answerDetail['couldAnswer'] = res['couldAnswer'] // 判断今日是否已经答题
        answerDetail['itemId'] = res['itemId'] // 今日答题编号
        wx.setStorageSync('answerDetail', answerDetail)

        //  是否符合参加抽奖资格
        wx.setStorageSync('lottery', res)
        wx.redirectTo({
          url: '/pages/lottery/result/result',
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
        // 提交成功，跳转结果展示页面
        this.setData({ loading: false })
      })
    } else {
      this.setData({
        btnShake: false,
        currentQuesIndex: this.data.currentQuesIndex + 1
      })
    }
  },
  
  /**
   * 点击单选框，保存答案
   * @param {*} e 
   */
  radioAnswer(e) {
    let answers = this.data.answers
    answers[this.data.currentQuesIndex - 1] = Number(e.detail.value)
    this.setData({ answers: answers })
  },

  /**
   * 提交答题数据
   */
  postAnswer() {
    // 判断正确数量
    let rightNum = 0
    this.data.answers.forEach((item, index) => {
      if (Number(item) == Number(this.data.questions.list[index].yes)) rightNum += 1
    })
    console.log("用户完成答题，正确数量：" + rightNum)
    // 发送请求
    return new Promise((resolve, reject) => {
      console.log("发送答题结果")
      let data = {
        'answerId': this.data.questions.answerId,
        'right': rightNum
      }
      post(putResult, data).then(res => {
        if (res.retno == 0) {
          console.log("提交答题数据结果：" + JSON.stringify(res))
          resolve(res.data)
        } else {
          reject("提交答题数据失败: " + JSON.stringify(res))
        }
      }).catch(err => {
        reject("提交答题数据失败：" + JSON.stringify(err))
      })
    })
  },

  /**
   * 计时器
   */
  timer() {
    let that = this
    setTimeout(() => {
      that.setData({
        time: this.data.time - 1
      })
    }, 1000)
    
  }
})