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
      .on("progress", this.loadProgressHandler)
      .load(this.setup);

    console.log(this.name + "'s app is built");
  }

  loadProgressHandler(loader, resource) {
    console.log(resource.name + " loading " + loader.progress + "%");
  }

  setup() {
    console.log(this.name + "'s app is set up");
  }


}

let player = new Joueur("BMX", "player/BMX.png")
console.log(player.name);
player.build();
