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

//object
class Joueur {
  constructor(name, file) {
    this.name = name;
    this.file = file;
  }

  build() {
    PIXI.Loader.shared
      .add(this.name, path + this.file)
      .on("progress", this.loadProgressHandler.bind(this))
      .load(this.setup.bind(this));

    console.log(this.name + "'s app is built");
  }

  loadProgressHandler(loader, resource) {
    console.log(resource.name + " loading " + loader.progress + "%");
  }

  setup() {
    console.log(this.name + "'s loaded 100%");
    var name = this.name;
    console.log(path + this.file);
    sprite = new PIXI.Sprite(
      PIXI.Loader.shared.resources.this.name.texture
    );
    sprite.position.set(300, app.view.height/1.5);
    sprite.anchor.set(.5, .5);
    sprite.scale.set(3,3);
    app.stage.addChild(sprite);
    // update function
    // gameLoop();
  }


}

let player = new Joueur("BMX", "player/BMX.png")
console.log(player.name);
player.build();
