//APP PIXIJS

//Create a Pixi Application
let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  transparent: true
});
document.body.appendChild(app.view);
app.renderer.autoDensity = true;

let path = "sprites/";
PIXI.Loader.shared
  .add("BMX", path + "player/BMX.png")
  .add("Skate", path + "player/Skate.png")
  .on("progress", loadProgressHandler)
  .load(setup);

//décalration variables
let skate, bmx;

//Chargement
function loadProgressHandler(loader, resource) {
  console.log(resource.name + " loading " + loader.progress + "%");
}
//Sprites Chargés
function setup() {
  console.log("loaded 100%");
  bmx = new PIXI.Sprite(
    PIXI.Loader.shared.resources.BMX.texture
  );
  skate = new PIXI.Sprite(
    PIXI.Loader.shared.resources.Skate.texture
  );
  skate.position.set(300, app.view.height/1.5);
  skate.anchor.set(.5, .5);
  skate.scale.set(3,3);
  app.stage.addChild(bmx, skate);

  // update function
  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
}























//
