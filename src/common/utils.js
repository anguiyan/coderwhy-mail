
// 设置debounce delay时间后执行传过来的fand，赋值timer，
// 再次调用debounce，timer有值，清除
export function   debounce(func, delay) {
    let timer = null
    return function (...args){
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      },delay)
    }
  }




// 时间戳 转成 时间
export function formatDate(date, fmt) {
  // 1.获取年份
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '')
    .substr(4 - RegExp.$1.length));
  }
  //获取 其他时间
  let o = {
    'M+' : date.getMonth() + 1,
    'd+' : date.getDate(),
    'h+' : date.getHours(),
    'm+' : date.getMinutes(),
    's+' : date.getSeconds()
  };
  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
// 针对后台返回数据是1位，设置成两位。3:3:3
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}


