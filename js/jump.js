
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
let preJump = new TimelineMax();
keyObject.press = () => {
  sprite.stop();
  power = 20;
  loadJump();
  function loadJump() {
    if(power < 100) {
      power += .5;
    }
    requestAnimationFrame(loadJump);
  }
  preJump.add(
    TweenMax.to(sprite, .1, {rotation: -.1, ease: Power1.easeOut})
  );
};

let jump = new TimelineMax();
keyObject.release = () => {
  // console.log(power);
  if(! jump.isActive()) {
    jump.add(
      TweenMax.to(sprite, .4, {y: "-=" + 260, ease: Power1.easeOut})
    ).add(
      TweenMax.to(sprite, .4, {y: app.view.height/1.15, ease: Power1.easeIn})
    ).add(
      TweenMax.to(sprite, .05, {rotation: 0, ease: Power1.easeIn})
    )
  }

  setTimeout(function() {
    sprite.play();
  }, 800);
};
