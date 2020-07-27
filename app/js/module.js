'use strict'

/** Amazon商品ページ パターン */
const pattern = '^/?.*(/(dp|gp/product)/.{10})/?.*$'
/** Amazon商品ページ 正規表現 */
const regex = new RegExp(pattern)
/** 現在ページURLのオリジン */
const origin = location.origin
/** 現在ページURLのパス名 */
const path = location.pathname

/**
 * コピーボタンを表示する
 */
const displayButton = () => {
  // 商品ページ以外で実行しない
  if (! path.match(regex)) {
    return
  }
  
  // ボタンを作成する
  const copyButton = document.createElement('button')
  copyButton.textContent = 'URLをコピーする'
  copyButton.style.cssText = 'font-size: 16px; width: 160px; height: 27px'
  // クリックイベントを登録する
  copyButton.addEventListener('click', () => {
    copyAmazonMiniUrl()
  })
  // ボタンを画面に表示する
  const title = document.getElementById('title')
  title.appendChild(copyButton);
}

/**
 * Amazon商品ページのミニURLをコピーする
 */
const copyAmazonMiniUrl = () => {
  // 現在ページのミニURLを生成する
  const miniURL = origin + path.replace(regex, '$1')
  // ミニURLをクリップボードにコピーする
  const result = copyToClipboard(miniURL)
  if (result) {
    console.log('copied amazon mini URL to clipboard.')
  }
}

/**
 * 指定した文字列をクリップボードにコピーする
 * @param {string} value コピー対象の文字列
 */
const copyToClipboard = (value) => {
  // 一時的に要素を作成する
  const tmp = document.createElement('input')
  tmp.value = value;
  document.body.appendChild(tmp);

  // 文字列をクリップボードにコピーする
  tmp.select();
  const result = document.execCommand('copy')

  // 不要になった要素を削除する
  document.body.removeChild(tmp)

  return result;
}
