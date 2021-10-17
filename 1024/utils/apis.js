// 题目模块
const partList = '/api/part/list'
const quizList = '/api/question/retlist' // 查询每日题目
const putResult = '/api/answer/putResult'


// 用户模块
const getUserToken = '/api/user/loginWechat'
const postNewUserInfo = '/api/user/putInfo'
const getUserInfo = '/api/user/info'
const postOpenUserInfo = '/api/user/putWechat'
const getLuckyList = '/api/lucky/list'
const getUserCredit = '/api/credit/info'
const getLevelList = '/api/level/list'
const getUserStatus = '/api/user/partStatus'
const getTimeStatus = '/api/user/timeStatus'


// 抽奖模块
const postAwardList = '/api/award/list'
const postAwardResult = '/api/draw/postResult'
const postDrawLast = '/api/draw/last' // 最后一天大奖

module.exports = {
    getUserToken,
    postNewUserInfo,
    getUserInfo,
    postOpenUserInfo,
    getUserStatus,
    getTimeStatus,
    partList,
    quizList,
    putResult,
    postAwardList,
    postAwardResult,
    getLuckyList,
    getUserCredit,
    getLevelList,
    postDrawLast
}