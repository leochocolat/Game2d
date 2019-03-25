let path = "sprites/";
let sprite;
//Create a Pixi Application
let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  transparent: true
});
document.body.appendChild(app.view);
app.renderer.autoDensity = true;

var Joueur = function(name, file) {
  this.name = name;
  this.file = file;
}

Joueur.prototype.BuildSprite = function () {
  PIXI.Loader.shared
    .add(this.name, path + this.file)
    .on("progress", loadProgressHandler)
    .load(setup);

  //loading sprites
  function loadProgressHandler(loader, resource) {
    console.log(resource.name + " loading " + loader.progress + "%");
  }

  //Sprites Chargés
  function setup() {
    console.log(this.name);
    console.log("loaded 100%");
    sprite = new PIXI.Sprite(
      PIXI.Loader.shared.resources.this.name.texture
    );
    sprite.position.set(300, app.view.height/1.5);
    sprite.anchor.set(.5, .5);
    sprite.scale.set(3,3);
    app.stage.addChild(sprite);
    // update function
    gameLoop();
  }

};

function gameLoop() {
  requestAnimationFrame(gameLoop);
}

var player = new Joueur("BMX", "player/BMX.png");
player.BuildSprite();
