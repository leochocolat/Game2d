let path = "sprites/";
let sprite, backgroundBack, backgroundFront;
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
      .add(path + this.file)
      .add(path + "background/backbuildings.json")
      .add(path + "background/frontbuildings.json")
      .add(path + "background/test-back.png")
      .add(path + "background/test-front.png")
      .on("progress", this.loadProgressHandler.bind(this))
      .load(this.setup.bind(this));

    console.log(this.name + "'s app is built");
  }

  loadProgressHandler(loader, resource) {
    console.log(resource.name + " loading " + loader.progress + "%");
  }
  setup() {
    //PLAYER
    console.log(this.name + "'s loaded 100%");
    var frames = [];
    for (var i = 0; i < 4; i++) {
        frames.push(PIXI.Texture.from(this.name + "_" + i + '.png'));
    }
    sprite = new PIXI.AnimatedSprite(frames);
    sprite.animationSpeed = .10;
    sprite.position.set(300, app.view.height/1.2);
    sprite.anchor.set(.5, 1);
    sprite.scale.set(3,3);
    sprite.play();

  //BACKGROUNDS
    // Back buildings
    var backBgs = [];
    for (var i = 1; i <= 13; i++) {
      backBgs.push(PIXI.Texture.from("pixcity_Building" + i + '.png'));
    }

    backgroundBack = new PIXI.TilingSprite(
      PIXI.Loader.shared.resources[path + "background/test-back.png"].texture,
      app.view.width,
      app.view.height
    );
    backgroundBack.position.set(0, app.view.height/1.2);
    backgroundBack.tilePosition.set(0, app.view.height);
    backgroundBack.anchor.set(0,1);
    backgroundBack.scale.set(1.6,1.6);
    app.stage.addChild(backgroundBack);

    // Front buildings
    var frontBgs = [];
    for (var i = 1; i <= 5; i++) {
      frontBgs.push(PIXI.Texture.from("pixcity_Immo" + i + '.png'));
    }

    backgroundFront = new PIXI.TilingSprite(
      PIXI.Loader.shared.resources[path + "background/test-front.png"].texture,
      app.view.width,
      app.view.height
    );
    backgroundFront.position.set(0, app.view.height/1.2);
    backgroundFront.tilePosition.set(0, app.view.height);
    backgroundFront.anchor.set(0,1);
    backgroundFront.scale.set(1.6,1.6);
    app.stage.addChild(backgroundFront);


    app.stage.addChild(sprite);
    // update function
    this.gameLoop();
  }

  gameLoop() {
    backgroundBack.tilePosition.x -= 3;
    backgroundFront.tilePosition.x -= 5;
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

// Initialisation
let player1 = new Player("BMX", "player/bmx.json");
// let player = new Player("Skate", "player/Skate.png");
// player.build();
player1.build();

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
  sprite.stop();
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
    TweenMax.to(sprite, .4, {y: 400, ease: Power1.easeOut})
  ).add(
    TweenMax.to(sprite, .4, {y: app.view.height/1.2, ease: Power1.easeIn})
  ).add(
    TweenMax.to(sprite, .1, {rotation: 0, ease: Power1.easeIn})
  )
  setTimeout(function() {
    sprite.play();
  }, 800);
};
