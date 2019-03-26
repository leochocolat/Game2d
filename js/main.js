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
  .add(path + "player/test-bmx.json")
  .on("progress", loadProgressHandler)
  .load(setup);

//décalration variables
let briquet;
//Chargement
function loadProgressHandler(loader, resource) {
  console.log(resource.name + " loading " + loader.progress + "%");
}
//Sprites Chargés
function setup() {
  console.log("loaded 100%");

  var frames = [];
  for (var i = 1; i < 5; i++) {
      // magically works since the spritesheet was loaded with the pixi loader
      frames.push(PIXI.Texture.from('frame' + i + '.png'));
  }

  console.log(frames);

  anim = new PIXI.AnimatedSprite(frames);
  anim.animationSpeed = .10;
  anim.position.set(300, app.view.height/1.5);
  anim.anchor.set(.5, .5);
  anim.scale.set(3,3);
  anim.play();

  app.stage.addChild(anim);
  // update function
  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
}

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };
  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };
  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  return key;
}

let keyObject = keyboard(" ");

keyObject.press = () => {
  console.log("keypressed");
};
keyObject.release = () => {
  console.log("keyreleased");
  let jump = new TimelineMax();
  jump.add(
    TweenMax.to(skate, .4, {y: 200, ease: Power1.easeOut})
  ).add(
    TweenMax.to(skate, .4, {y: app.view.height/1.5, ease: Power1.easeIn})
  )
};





















//
