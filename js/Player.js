let sprite, enemy, backgroundBack, backgroundFront, Back_0, Back_1, Back_2, Back_3, Back_4, ground, btn, message;
let path = "sprites/";
let power = 0;

//CREATE PIXI APP
let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  preserveDrawingBuffer: true,
  transparent: true,
  antialias: true,
});
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
let hitTest;
let appearMsg = new TimelineMax();

//RENDER IN VIEW
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
      .add(path + "background/obs.json")
      .add(path + "background/road_1.png")
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
    sprite.position.set(100, app.view.height/1.15);
    sprite.anchor.set(0, 1);
    sprite.scale.set(3,3);
    sprite.play();

    //BACKGROUNDS
    var backs = [];
    for (var i = 1; i <= 5; i++) {
      backs.push(PIXI.Texture.from("Back_" + i + '.png'));
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

    let groundTexture = PIXI.Texture.from(path + "background/road_1.png")
    ground = new PIXI.TilingSprite(groundTexture, app.view.width, app.view.height - app.view.height/1.2);
    ground.width = app.view.width;
    ground.height = app.view.height - app.view.height/1.2;
    ground.scale.set(5,5)
    console.log(ground);
    ground.position.set(0, app.view.height/1.2);
    app.stage.addChild(ground);

    // MESSAGE
    message = new PIXI.Text("You Lose!");
    message.position.set(app.view.width/2, app.view.height/2);
    message.anchor.set(.5, .5);
    message.alpha = 0;
    message.scale.set(1.5 ,1.5);
    app.stage.addChild(message);

    //OBSTACLES
    var obs = [];
    for (var i = 1; i <= 2; i++) {
      obs.push(PIXI.Texture.from("obs_" + i + '.png'));
    }
    enemy = new PIXI.AnimatedSprite(obs);
    enemy.scale.set(4, 4);
    enemy.anchor.set(0,1);
    enemy.position.set(1500, app.view.height/1.15);
    enemy.gotoAndStop(parseInt(Math.random()*2));
    app.stage.addChild(enemy);

    // ADD SPRITE
    app.stage.addChild(sprite);

    // UPDATE FUNCTIONS
    this.gameLoop();
    this.collision();
  }

  gameLoop() {
    console.dir(performance.now());
    Back_0.tilePosition.x -= 1;
    Back_1.tilePosition.x -= 1.1;
    Back_2.tilePosition.x -= 1.3;
    Back_3.tilePosition.x -= 1.8;
    Back_4.tilePosition.x -= 2.5;
    enemy.position.x -= 17;
    ground.tilePosition.x -= 3.4;

    //TEST POSITION
    if(enemy.position.x + enemy.width < 0) {
      enemy.position.x = app.view.width + (Math.random() * app.view.width);
      enemy.gotoAndStop(parseInt(Math.random()*2));
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  collision() {
    var bounds = sprite.getBounds();
    var enemyBounds = enemy.getBounds();
    requestAnimationFrame(this.collision.bind(this));
    // TESTS
    if(bounds.x + bounds.width >= enemyBounds.x && bounds.x < enemyBounds.x + enemyBounds.width && bounds.y + bounds.height >= enemyBounds.y) {
      this.loose();
    }
  }

  loose() {
    if(! appearMsg.isActive()) {
      appearMsg.add(
        TweenMax.to(message, .3, {alpha: 1, ease:Power1.easeInOut})
      ).add(
        TweenMax.to(message, .3, {alpha: 0, ease:Power1.easeInOut})
      )
    }
  }
}

// Initialisation
let player1 = new Player("BMX", "player/bmx.json");
// let player = new Player("Skate", "player/Skate.png");
// player.build();
player1.build();
