import React from 'react';
import './Practice.css';
import character from '../assets/img/character_front.png'
import * as PIXI from 'pixi.js';

class Practice extends React.Component {
  myRef: React.RefObject<HTMLDivElement>;
  view: HTMLCanvasElement | null= null

  constructor(props: any) {
    super(props);

    // Elementに対するrefを作成し、render内のElementに登録
    this.myRef = React.createRef();

  }

  componentDidMount() {
    // Didmount後にPIXIを登録
    if (!this.myRef.current) return
    this.view = this.pixiAnimation() || null
  }

  componentWillUnmount() {
    if (!this.myRef.current) return
    if (this.view){
        this.myRef.current.removeChild(this.view)
    }
  }

  pixiAnimation() {
    if (!this.myRef.current) return
    /**
  * STEP.1 元となるコンテナを用意。画面に描画される要素は全てこの下にぶら下がる
  */
    const stage = new PIXI.Container();

    /**
     * STEP.2 描画するためのレンダラーを用意。引数は描画領域の幅、高さ、オプション
     */
    const renderer = PIXI.autoDetectRenderer({
      width: 640, 
      height: 360,
      antialias: true,     // アンチエイリアスをONに
      backgroundColor: 0x00ffd4, // 背景色
      //  transparent:      true,     // 背景を透過にしたい場合はこちらを指定
    });

    /**
     * STEP.3 #stage のDOM要素に view を追加
     */
    this.myRef.current.appendChild(renderer.view);

    /**
     * animation関数を定義
     */
    const animation = () => {
      // 再帰的に次のアニメーションフレームで animation関数を呼び出す
      requestAnimationFrame(animation);

      // 描画
      renderer.render(stage);
    };

    /**
     * animation関数を呼び出す
     */
    animation();
    var ttrGirl = PIXI.Texture.from(character);

    /**
     * テクスチャからスプライトを生成する
     */
    var sprGirl = new PIXI.Sprite(ttrGirl);
  
    /**
     * スプライトを、コンテナであるstageの子要素として追加する
     */
    stage.addChild(sprGirl);

    return renderer.view
  }

  render() {
    return <div>
      <div ref={this.myRef} className='stage'>
      </div>
    </div>
  }
}

export default Practice;