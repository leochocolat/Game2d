const canvas = document.getElementById("myCanvas");
let sceneWidth = window.innerWidth;
let sceneHeight = window.innerHeight;

const renderer = new PIXI.Renderer({
  view: canvas,
  width: sceneWidth,
  height: sceneHeight,
  resolution: devicePixelRatio,
  autoDensity: true,
  transparent: false,
});

window.addEventListener("resize", resize);

function resize() {
  let sceneWidth = window.innerWidth;
  let sceneHeight = window.innerHeight;
  renderer.resize(sceneWidth, sceneHeight)
}

const stage = new PIXI.Container();

const textures = [
  PIXI.Texture.from("sprites/street/far-buildings.png"),
  PIXI.Texture.from("sprites/street/back-buildings.png"),
  PIXI.Texture.from("sprites/street/foreground.png")
];

var backgrounds = [];

for (i=0; i < textures.length; i++) {
  var background = new PIXI.Sprite(textures[i]);
  background.anchor.x = .5;
  background.anchor.y = .5;
  stage.addChild(background);
  backgrounds.push(background);
}

console.dir(stage);

const ticker = new PIXI.Ticker();
ticker.add(animate);
ticker.start();

function animate() {
  for(i=0; i < backgrounds.length; i++) {
    backgrounds[i].width = renderer.screen.width;
    backgrounds[i].height = renderer.screen.height;
    backgrounds[i].x = renderer.screen.width/2;
    backgrounds[i].y = renderer.screen.height/2;
    // backgrounds[i].x += 1;
  }
  renderer.render(stage);
}
