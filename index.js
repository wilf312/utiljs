/*
 * JS utility
 * Released under the MIT license
 */

var path = require('path')
var moment = require('moment')
var anime = require('animejs')



/**
コンポーネントの名前を取得
@param {string} fileName ファイルパス ※ __fileNameが渡される想定
@return {string} 拡張子なしのファイル名
@note Webpackの設定で node: { __filename: true }
@example
    getFileName(__fileName); //=> index
*/
module.exports.getFileName = function(fileName) {
    const baseName = path.basename(fileName)
    const extName = path.extname(fileName)

    return baseName.replace(extName, '')
}

/**
MySQLのdatetime形式を変換して日付を返す
@param {string} timestamp ファイルパス ※ __fileNameが渡される想定
@return {string} 'YYYY/M/D HH:mm' 形式の日付
@note Webpackの設定で node: { __filename: true }
@example
    getDateFormat('2016-08-22 16:00:00'); //=> 2016/8/22 16:00
*/
module.exports.getDateFormat = function(timestamp) {
    const datetime = new moment(timestamp).format('YYYY/M/D HH:mm')
    return datetime
}


/**
デバッグログ （本番直前でログ出てると辛いのでラッパー）
@param {array} textList
@example
    log('hoge'); //=> 'hoge'
    log('hoge', true); //=> 'hoge', true
    log('hoge', true, {ab: 'cd'}); //=> 'hoge', true, {ab: 'cd'}
*/
module.exports.log = function(...textList) {
    const isDebug = true
    if (isDebug) {
        console.log.apply(console, textList)
    }
}

/**
$targetの位置までwindowをスクロール
@param {HTMLElement} $target HTMLの要素
@note animejs を使用している
@example
    scrollTo(document.querySelector('body')); //=> ページトップへスクロール
    scrollTo(document.querySelector('#a')); //=> #a の位置までスクロール
*/
module.exports.scrollTo = function($target) {
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
      update: function() {
        window.scrollTo(0, animaObj.scroll)
      }
    });
  }
}

/**
HTML要素の取得
@param {HTMLElement} selector HTMLの要素
@example
    $('body'); //=> body要素の取得
    $('#a'); //=> ID a の要素を取得

    // scrollToと併用すると↓のように書ける
    scrollTo($('#a')) //=> ID a の位置へスクロール
*/
module.exports.$ = function(selector) {
  // Handle HTML strings
  if ( typeof selector === "string" ) {
    return document.querySelector(selector)

  // HANDLE: $(DOMElement)
  }
  else if ( selector.nodeType ) {
    return selector
  }
}





/**
ネイティブイベントを疑似実行する
@param {HTMLElement} $elm HTMLの要素
@param {string} event イベント名
@example
    trigger(document.querySelector('#button'), 'click')

    // $と併用すると↓のように書ける
    trigger($('#button'), 'click')
*/
module.exports.trigger = function($elm, event) {

  if (document.createEvent) {
    // IE以外
    var evt = document.createEvent("HTMLEvents")
    evt.initEvent(event, true, true )  // event type, bubbling, cancelable
    return $elm.dispatchEvent(evt)
  }
  else {
    // IE
    var evt = document.createEventObject()
    return $elm.fireEvent("on"+event, evt)
  }
}
