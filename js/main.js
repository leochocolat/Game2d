const canvas = document.getElementById("myCanvas");
let sceneWidth = window.innerWidth;
let sceneHeight = window.innerHeight;

// const app = new PIXI.Application({
//   view: canvas,
//   width: sceneWidth,
//   height: sceneHeight
// });

const renderer = new PIXI.Renderer({
  view: canvas,
  width: sceneWidth,
  height: sceneHeight,
  resolution: devicePixelRatio,
  autoDensity: true
});

window.addEventListener("resize", resize);

function resize() {
  let sceneWidth = window.innerWidth;
  let sceneHeight = window.innerHeight;
  renderer.resize(sceneWidth, sceneHeight)
}

const stage = new PIXI.Container();

const texture = PIXI.Texture.from("sprites/sprite.png");
const img = new PIXI.Sprite(texture);
img.anchor.x = .5;
img.anchor.y = .5;

stage.addChild(img);
const ticker = new PIXI.Ticker();
ticker.add(animate);
ticker.start();

function animate() {
  img.x = renderer.screen.width/2;
  img.y = renderer.screen.height/2;
  renderer.render(stage);
  // img.rotation += 0.01;
}
