var fps = 0;

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame   ||
    window.mozRequestAnimationFrame      ||
    window.oRequestAnimationFrame        ||
    window.msRequestAnimationFrame       ||
    function(callback, element){
        window.setTimeout(function(){
            callback(+new Date);
        }, 1000 / 60);
    };
})();

game_running = true,
show_fps     = true;
var lastRun;

function showFPS(){
    // console.log(fps);
}
function getFPS(){
    if(!lastRun) {
        lastRun = new Date().getTime();
        requestAnimFrame(getFPS);
        return;
    }
    var delta = (new Date().getTime() - lastRun)/1000;
    lastRun = new Date().getTime();
    fps = 1/delta;

    showFPS();
    requestAnimFrame(getFPS);
}
getFPS();
