let path = "sprites/";
let sprite, backgroundBack, backgroundFront, Back_0, Back_1, Back_2, Back_3, Back_4, enemy;
let power = 0;
//Create a Pixi Application
let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  // scaleMode: PIXI.settings.SCALE_MODE.NEAREST,
  preserveDrawingBuffer: true,
  transparent: true,
  antialias: true,
});
let b = new Bump(app);
let hitTest;



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
      .add(path + "background/Back.json")
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
    sprite.position.set(100, app.view.height/1.2);
    sprite.anchor.set(0, 1);
    sprite.scale.set(3,3);
    sprite.play();

  //BACKGROUNDS
    // (with tileSprite)
    var backs = [];
    var tils = [];
    for (var i = 1; i <= 5; i++) {
      backs.push(PIXI.Texture.from("Back_" + i + '.png'));
      // tils.push(new PIXI.TilingSprite(backs[i], app.view.width, app.view.height);
    }

    Back_0 = new PIXI.TilingSprite(backs[0], app.view.width, app.view.height);
    Back_0.position.set(0, app.view.height/1.2);
    Back_0.tilePosition.set(0, app.view.height);
    Back_0.anchor.set(0,1);
    Back_0.scale.set(3,3);
    app.stage.addChild(Back_0);

    Back_1 = new PIXI.TilingSprite(backs[1], app.view.width, app.view.height);
    Back_1.position.set(0, app.view.height/1.2);
    Back_1.tilePosition.set(0, app.view.height);
    Back_1.anchor.set(0,1);
    Back_1.scale.set(3,3);
    app.stage.addChild(Back_1);

    Back_2 = new PIXI.TilingSprite(backs[2], app.view.width, app.view.height);
    Back_2.position.set(0, app.view.height/1.2);
    Back_2.tilePosition.set(0, app.view.height);
    Back_2.anchor.set(0,1);
    Back_2.scale.set(3,3);
    app.stage.addChild(Back_2);

    Back_3 = new PIXI.TilingSprite(backs[3], app.view.width, app.view.height);
    Back_3.position.set(0, app.view.height/1.2);
    Back_3.tilePosition.set(0, app.view.height);
    Back_3.anchor.set(0,1);
    Back_3.scale.set(3,3);
    app.stage.addChild(Back_3);

    Back_4 = new PIXI.TilingSprite(backs[4], app.view.width, app.view.height);
    Back_4.position.set(0, app.view.height/1.2);
    Back_4.tilePosition.set(0, app.view.height);
    Back_4.anchor.set(0,1);
    Back_4.scale.set(3,3);
    app.stage.addChild(Back_4);

    // var Noisefilter = [new PIXI.filters.NoiseFilter(.1, .9)];
    // Back_0.filters = Noisefilter;

    //obstacle
    enemy = new PIXI.Graphics();
    enemy.beginFill(0xFFFF00);
    enemy.lineStyle(5, 0xFF0000);
    enemy.drawRect(0, 0, 100, -150);
    console.log(enemy);
    enemy.position.set(1500, app.view.height/1.2);
    app.stage.addChild(enemy);
    app.stage.addChild(sprite);
    // update function
    this.gameLoop();
    this.collision();
  }

  gameLoop() {
    Back_0.tilePosition.x -= 1.5;
    Back_1.tilePosition.x -= 1.7;
    Back_2.tilePosition.x -= 2;
    Back_3.tilePosition.x -= 2.6;
    Back_4.tilePosition.x -= 4;
    enemy.position.x -= 17;
    if(enemy.position.x + enemy.width < 0) {
      enemy.position.x = app.view.width;
    }
    // backgroundFront.tilePosition.x -= 5;
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  collision() {
    var bounds = sprite.getBounds();
    var enemyBounds = enemy.getBounds();
    // console.log(bounds.y + " " +( enemyBounds.y - enemyBounds.height ));
    requestAnimationFrame(this.collision.bind(this));
    // TESTS
    if(bounds.x + bounds.width >= enemyBounds.x && bounds.x < enemyBounds.x + enemyBounds.width && bounds.y + bounds.height >= enemyBounds.y) {
      console.log("loose : " + "sprite.y = " + bounds.y + " enemy.y = " + enemyBounds.y );
    }
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
    TweenMax.to(sprite, .1, {rotation: -.1, ease: Power1.easeOut})
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
    TweenMax.to(sprite, .05, {rotation: 0, ease: Power1.easeIn})
  )
  setTimeout(function() {
    sprite.play();
  }, 800);
};
