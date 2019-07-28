import React from 'react';
import './Practice.css';
import character from '../assets/img/character_front.png'
import * as PIXI from 'pixi.js';

class Practice extends React.Component {
  myRef: React.RefObject<HTMLDivElement>;
  view: HTMLCanvasElement | null = null

  constructor(props: any) {
    super(props);

    // Elementに対するrefを作成し、render内のElementに登録
    this.myRef = React.createRef();

  }

  componentDidMount() {
    // Didmount後にPIXIを登録
    if (!this.myRef.current) return
    this.view = this.pixiAnimation()
  }

  componentWillUnmount() {
    if (!this.myRef.current) return
    if (this.view) {
      this.myRef.current.removeChild(this.view)
    }
  }

  pixiAnimation() {
    if (!this.myRef.current) return null

    /**
     * STEP.2 描画するためのレンダラーを用意。引数は描画領域の幅、高さ、オプション
     */
    const app = new PIXI.Application({
      width: 640,
      height: 360,
      antialias: true,     // アンチエイリアスをONに
      backgroundColor: 0x00ffd4, // 背景色
      //  transparent:      true,     // 背景を透過にしたい場合はこちらを指定
    });

    /**
     * STEP.3 #stage のDOM要素に view を追加
     */
    this.myRef.current.appendChild(app.view);


    /**
     * 女の子の画像を読み込み
     * テクスチャからスプライトを生成する
     */
    const ttrGirl = PIXI.Texture.from(character);
    const sprGirl = new PIXI.Sprite(ttrGirl);
    // 回転座標の中心を指定（画像の中心にする）
    sprGirl.anchor.set(0.5)
    // move the sprite to the center of the screen
    sprGirl.x = app.screen.width / 2;
    sprGirl.y = app.screen.height / 2;

    /**
     * スプライトを、コンテナであるstageの子要素として追加する
     */
    app.stage.addChild(sprGirl);

    app.ticker.add(() => {
      // 女の子を回転させる
      sprGirl.rotation += 0.1;
  });

    return app.view
  }

  render() {
    return <div>
      <div ref={this.myRef} className='stage'>
      </div>
    </div>
  }
}

export default Practice;