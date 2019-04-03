let path = "sprites/";
let sprite, backgroundBack, backgroundFront, Back_0, Back_1, Back_2, Back_3, Back_4, enemy, btn, message;
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
let hitTest;
let appearMsg = new TimelineMax();

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

    message = new PIXI.Text("You Lose!");
    message.position.set(app.view.width/2, app.view.height/2);
    message.anchor.set(.5, .5);
    message.alpha = 0;
    message.scale.set(1.5 ,1.5);
    app.stage.addChild(message);

    // var NoiseFilter = [new PIXI.filters.NoiseFilter(0, .1)];
    // sprite.filters = NoiseFilter;

    //obstacle
    var obs = [];
    for (var i = 1; i <= 2; i++) {
      obs.push(PIXI.Texture.from("obs_" + i + '.png'));
    }

    enemy = new PIXI.AnimatedSprite(obs);
    enemy.scale.set(4, 4);
    enemy.anchor.set(0,1);
    enemy.position.set(1500, app.view.height/1.2);
    enemy.gotoAndStop(parseInt(Math.random()*2));
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
