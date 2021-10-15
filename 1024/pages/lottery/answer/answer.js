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
    fullTime: 30,
    leftTime: 30,
    count: ''  // 定时器名称
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
    // this.timer() // 开启定时器
    
    this.setData({ loading: true })
    this.getQuestions(option.itemId)
    .then(res => {
      this.setData({
        questions: res
      })
      this.timer() // 开启定时器
    }).catch(err => {
      wx.showToast({
        title: '网络连接超时',
        icon: 'error',
        duration: 2000,
        mask: true
      })
      console.error(err)
      setTimeout(() => {
        wx.redirectT({
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
    this.setData({ checked: '' })
    // 校验当前题目是否选择单选框
    if (this.data.answers.length != this.data.currentQuesIndex) { // 未选择
      this.setData({ btnShake: true })
    } else if (this.data.currentQuesIndex == this.data.questions.list.length) {
      // 提交数据
      this.setData({ loading: true })
      this.postAnswer().then(res => {
        // 更新当日答题限制数据
        let answerDetail = wx.getStorageSync('answerDetail')
        answerDetail['couldAnswer'] = res['couldAnswer'] // 判断今日是否已经答题
        answerDetail['itemId'] = res['itemId'] + 1 // 本地自动更新答题编号
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
    } else { // 进入下一题
      // 重新设置定时器
      this.timer()
      // 定时器设置完毕
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
    console.log(e)
    let answers = this.data.answers
    answers[this.data.currentQuesIndex - 1] = Number(e.detail.value)
    this.setData({ answers: answers })
  },

  /**
   * 点击单选框条目
   */
  clickItem(e) {
    let answers = this.data.answers
    answers[this.data.currentQuesIndex - 1] = Number(e.target.dataset.id)
    this.setData({ 
      answers: answers,
      checked: Number(e.target.dataset.id)
     })
  },

  /**
   * 提交答题数据
   */
  postAnswer() {
    // 点击提交按钮，说明用户提前完成答题，清除定时任务
    clearInterval(this.data.count)

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
    // 清除旧定时器
    clearInterval(this.data.count)
    // 更新时间
    this.setData({ leftTime: this.data.fullTime })
    // 设置新定时器
    this.setData({
      count: setInterval(() => {
        let time = that.data.leftTime
        if (time <= 10) { // 倒计时闪烁
          if (time % 2 == 0) that.setData({ scaleDown: true })
          else that.setData({ scaleDown: false })
        }
        if (time == 0) { // 计时结束，说明用户没有完成当前题目选择
          // 设置答案为-1，说明必定为错
          let answers = that.data.answers
          answers[that.data.currentQuesIndex - 1] = -1
          that.setData({ answers: answers })
          // 调用跳转下一题接口
          // clearInterval(that.data.count); // 清除当前定时任务
          that.nextQues()
          return;
        }
        that.setData({ leftTime: time - 1 })
    },1000)
    })
  }  
})