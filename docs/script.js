var canvas = document.querySelector('canvas');
var canvasParent = document.querySelector('#canvasParent')
var mouseDistance = 30;
const magnet = 500;

/*canvas.width = window.innerWidth;
canvas.height = window.innerHeight;*/

canvas.width = canvasParent.offsetWidth;
canvas.height = canvasParent.offsetHeight;

var mouse = {
  x: null,
  y: null
}
window.addEventListener('mousemove', function(event){
  mouse.x = event.x - canvasParent.offsetLeft;
  mouse.y = event.y + window.pageYOffset - canvasParent.offsetTop;
});

window.addEventListener('resize', function(){
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  canvas.width = canvasParent.offsetWidth;
  canvas.height = canvasParent.offsetHeight;
  init();
});

ctx = canvas.getContext('2d');

function makeDot(x,y,radius){
  this.radius = (radius)? radius: 4;
  this.x = x;
  this.y = y;
  this.fx = 0;
  this.fy = 0;
  this.oX = x;
  this.oY = y;
  this.hsp = 0;
  this.vsp = 0;
  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#2299';
    ctx.fill();
  }
  this.update = () => {
    
    if(mouse.x !== null && mouse.y !== null) {
      let distancex = mouse.x - this.x;
      let distancey = mouse.y - this.y;

      distance = Math.sqrt((distancex * distancex) + (distancey * distancey));

      powerx = this.x - (distancex / distance) * magnet / distance;
      powery = this.y - (distancey / distance) * magnet / distance;

      this.fx = (this.fx + (this.oX - this.x) / 2) / 2.1;
      this.fy = (this.fy + (this.oY - this.y) / 2) / 2.1;

      this.x = powerx + this.fx;
      this.y = powery + this.fy;
    } else {
      this.x = this.oX;
      this.y = this.oY;
    }
    

    this.draw();    
  }
}

var allDots;
function init(){
  allDots = [];
  let xLength = (canvas.width - 10) / 20;
  let yLength = (canvas.height - 10) / 20;
  
  for(i=0; i < xLength; i++){
    for(j=0; j < yLength; j++){

      allDots.push( new makeDot(i*30+10,j*30+10,6));
    }
  }
  
}

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  for(x in allDots){
    allDots[x].update();
  }
  requestAnimationFrame(animate);
}
init();
animate();







