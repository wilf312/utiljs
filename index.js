import path from 'path'
import moment from 'moment'
import anime from 'animejs'

// コンポーネントの名前を取得 ( __fileNameが渡される想定 )
// NOTE: (要) Webpackの設定で node: { __filename: true }
export function getFileName(fileName) {
    const baseName = path.basename(fileName)
    const extName = path.extname(fileName)

    return baseName.replace(extName, '')
}

// MySQLのdatetime形式から 2016-08-22 16:00:00 → 2016/8/22 16:00 のフォーマットで日付を返す
export function getDateFormat(timestamp) {
    const datetime = new moment(timestamp).format('YYYY/M/D HH:mm')
    return datetime
}


// デバッグログ
export function log(...textList) {
    const isDebug = true
    if (isDebug) {
        console.log.apply(console, textList)
    }
}

// $targetの位置までwindowをスクロール
export function scrollTo($target) {
  var scrollVal = 0

  if ($target) {
    scrollVal = $target.offsetTop

    var animaObj = {
      scroll: window.scrollY
    }
    var myAnimation = anime({
      targets: animaObj,
      scroll: scrollVal,
      duration: 300,
      easing: 'easeInOutQuad',
      // loop: true,
      // round: true,
      update: function() {
        window.scrollTo(0, animaObj.scroll)
      }
    });
  }
}

// DOM取得
export function $(selector) {

  // Handle HTML strings
  if ( typeof selector === "string" ) {
    return document.querySelector(selector)

  // HANDLE: $(DOMElement)
  }
  else if ( selector.nodeType ) {
    return selector
  }
}
