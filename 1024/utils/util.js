const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDay = date => {
  // const year = date.getFullYear()
  const month = date.split('-')[1]
  const day = date.split('-')[2]

  return month + '月' + day + '日'
}

const DateToTs = ts => {
  return new Date(ts).getTime()
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDay: formatDay,
  DateToTs: DateToTs
}
