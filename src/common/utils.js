/* 节流函数 */
let throttle = (fn, time = 0) => {
  let isRun = false

  return (...args) => {
    if (isRun) return
    isRun = true
    setTimeout(function () {
      fn(...args)
      isRun = false
    }, time)
  }
}
/* 获取元素距离顶端的距离 */
let getTopDistance = (ele) => {
  let top = 0;
  while (!!ele) {
    if (ele.offsetTop != null) {
      top += ele.offsetTop
    }
    ele = ele.parentNode
  }
  return top
}

let getPreviousHeight = (el) => {
  let pres = [],
      pre = null,
      result = 0
  while (pre = el.previousElementSibling) {
    pres.push(pre)
    el = pre
  }
  pres.forEach(item => {
    result += item.offsetHeight
  })
  return result
}
export {throttle, getTopDistance, getPreviousHeight}