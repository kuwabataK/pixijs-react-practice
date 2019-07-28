'use strict';

var util = require('util');

module.exports = [
  {
    src: './img/*.{png,gif,jpg}', // 元となる画像
    destImage: './output/assets/img/sprite.png', // 生成されるスプライト画像
    destCSS: './output/assets/img/sprite.json', // 生成されるスプライト情報のJSONファイル
    cssTemplate: require('spritesmith-texturepacker'), // 使用するテンプレート
    padding: 4, // 個々の画像の間隔[px]
    algorithmOpts: { sort: false }, // 画像の並べ方
  }
];