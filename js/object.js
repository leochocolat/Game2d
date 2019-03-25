let path = "sprites/";
let sprite;
let power = 0;
//Create a Pixi Application
let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  transparent: true
});
document.body.appendChild(app.view);
app.renderer.autoDensity = true;

//object
class Player {
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
    sprite = new PIXI.Sprite(
      PIXI.Loader.shared.resources[this.name].texture
    );
    sprite.position.set(300, app.view.height/1.5);
    sprite.anchor.set(.5, .5);
    sprite.scale.set(3,3);
    app.stage.addChild(sprite);
    // update function
    this.gameLoop();
  }

  gameLoop() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

let player = new Player("BMX", "player/BMX.png");
// let player = new Player("Skate", "player/Skate.png");
console.log(player.name);
player.build();

//Jump on keypressed

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
  power = 0;
  loadJump();
  function loadJump() {
    power += 1;
    requestAnimationFrame(loadJump);
  }
  console.log("Sprite animation : Flexion");
  let preJump = new TimelineMax();
  preJump.add(
    TweenMax.to(sprite, .2, {rotation: -.1, ease: Power1.easeOut})
  );
};
keyObject.release = () => {
  console.log(power);
  let jump = new TimelineMax();
  jump.add(
    TweenMax.to(sprite, .4, {y: 200, ease: Power1.easeOut})
  ).add(
    TweenMax.to(sprite, .4, {y: app.view.height/1.5, ease: Power1.easeIn})
  ).add(
    TweenMax.to(sprite, .1, {rotation: 0, ease: Power1.easeIn})
  )
};
