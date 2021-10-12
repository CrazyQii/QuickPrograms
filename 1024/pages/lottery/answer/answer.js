// pages/lottery/answer/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentQuesIndex: 1, // 当前第几题
    questions: [
      {
        'id': 1,
        'content': '题目1',
        'opta': '选项a',
        'optb': '选项b',
        'optc': '选项c',
        'optd': '选项d',
        'yes':  3
      },
      {
        'id': 2,
        'content': '题目2',
        'opta': '选项a',
        'optb': '选项b',
        'optc': '选项c',
        'optd': '选项d',
        'yes':  3
      },
      {
        'id': 3,
        'content': '题目3',
        'opta': '选项a',
        'optb': '选项b',
        'optc': '选项c',
        'optd': '选项d',
        'yes':  3
      },
      {
        'id': 4,
        'content': '题目4',
        'opta': '选项a',
        'optb': '选项b',
        'optc': '选项c',
        'optd': '选项d',
        'yes':  3
      },
      {
        'id': 5,
        'content': '题目5',
        'opta': '选项a',
        'optb': '选项b',
        'optc': '选项c',
        'optd': '选项d',
        'yes':  3
      }
    ],
    answers: [],
    btnShake: false,
    btnContent: '下一题'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
  },

  /**
   * 查询题目列表
   */
  getQuestions() {

  },

  /**
   * 切换题目显示
   * @param {*} currentQuesIndex 当前显示题目索引
   */
  nextQues() {
    // 校验当前题目是否选择单选框
    if (this.data.answers.length != this.data.currentQuesIndex) { // 未选择
      this.setData({
        btnShake: true
      })
      return
    } else if (this.data.currentQuesIndex == 5) { // 进入最后一道题
      this.setData({
        btnContent: '提交答案'
      })
    }
    
    else {
      this.setData({
        btnShake: false
      })
      this.setData({
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
    answers[this.data.currentQuesIndex - 1] = e.detail.value
    this.setData({
      answers: answers
    })
  }
})