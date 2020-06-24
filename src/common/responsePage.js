/**
* 用rem实现响应式布局
*  @param des 设计稿的宽度
 * @param fons 字体的宽度
* */

export default function (des = 640, fons = 100) {
  let computedSize = () => {
    let HTML = document.documentElement,
        winW = HTML.offsetWidth;

    // 大于640px的话, 字体大小是200px
    if (winW >= des) {
      HTML.style.fontSize = `${fons}px`
      return
    }
    // 如果小于640px就按比例计算
    HTML.style.fontSize = `${winW / des * fons}px`
  }

  computedSize()
  window.addEventListener('resize', computedSize)
}