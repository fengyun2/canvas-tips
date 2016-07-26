/*
 * @Author: Administrator
 * @Date:   2016-07-26 17:08:03
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-07-26 18:42:00
 */

'use strict';

/*require('babel-register')
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const W = canvas.width = window.innerWidth
const H = canvas.height = window.innerHeight
canvas.style.backgroundColor = '#232C33'
const ctx = canvas.getContext('2d')

canvas.addEventListener('mousemove', mousePosition, false)
canvas.addEventListener('click', toggleMouse, false)

const dotRadius = 9
let dots = []
let target = {
  radius: 50
}
let mouseControl = false
let angle = 0

class Dot {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.radius = dotRadius
    this.opacity = 0
    this.active = false
  }
  render() {
    ctx.globalAlpha = this.opacity
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.fillStyle = '#59C9A5'
    ctx.fill()
  }
}

function mousePosition(e) {
  target.x = e.clickX
  target.y = e.clickY
}

function toggleMouse(e) {
  mouseControl = !mouseControl
}

function displayGrid() {
  let col = Math.ceil(W / (dotRadius * 3))
  let row = Math.ceil(H / (dotRadius * 3))

  for (let j = 0; j < row; j++) {
    for (let i = 0; i < col; i++) {
      let dot = new Dot(i * dotRadius * 3, j * dotRadius * 3)
      dots.push(dot)
    }
  }
}

function animate() {
  if (!mouseControl) {
    let centerY = H / 2
    let centerX = W / 2
    let speed = 0.04
    let circleRadius = 150

    target.x = centerX + Math.cos(angle) * circleRadius
    target.y = centerY + Math.cos(angle) * circleRadius
    angle += speed
  }
}

function checkCollision() {
  dots.map(dot => {
    let dx = dot.x - target.x
    let dy = dot.y - target.y
    let distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < dot.radius + target.radius) {
      dot.active = true
    } else {
      dot.active = false
    }
  })
}

function handleFade(dot) {
  let fade = dot.opacity
  if (dot.active) {
    if (fade < 1) {
      fade += 0.03
      dot.opacity = Math.min(1, fade)
    }
  } else {
    if (fade > 0) {
      fade -= 0.01
      dot.opacity = Math.max(0, fade)
    }
  }
}

function update() {
  animate()
  checkCollision()
  dots.map(dot => handleFade(dot))
  ctx.clearRect(0, 0, W, H)
}

function render() {
  dots.map(dot => dot.render())
}

function main() {
  update()
  render()
  requestAnimationFrame(main)
}

displayGrid()
main()*/



const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const W = canvas.width = window.innerWidth;
const H = canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#232C33';
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousemove',mousePosition,false);
canvas.addEventListener('click',toggleMouse,false);

const dotRadius = 9;
let dots = [];
let target = {
  radius : 50
};
let mouseControl = false;
let angle = 0;

class Dot {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.radius = dotRadius;
    this.opacity = 0;
    this.active = false;
  }

  render(){
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = '#59C9A5';
    ctx.fill();
  }
}

function mousePosition(e){
  target.x = e.clientX;
  target.y = e.clientY;
}

function toggleMouse(e){
  mouseControl = !mouseControl;
}

function displayGrid() {
  let col = Math.ceil(W / (dotRadius * 3) );
  let row = Math.ceil(H / (dotRadius * 3) );

  for (let j = 0 ; j <= row ; j++ ){
    for (let i = 0 ; i <= col ; i++ ){
      let dot = new Dot(i * dotRadius * 3, j * dotRadius * 3);
      dots.push(dot);
    }
  }
}

function animate(){
  if (!mouseControl) {
    let centerY = H / 2;
    let centerX = W / 2;
    let speed = 0.04;
    let circleRadius = 150;

    target.x = centerX + Math.cos(angle) * circleRadius;
    target.y = centerY + Math.sin(angle) * circleRadius;
    angle += speed;
  }
}

function checkCollision() {
  dots.map(dot => {
    let dx = dot.x - target.x;
    let dy = dot.y - target.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < dot.radius + target.radius) {
      dot.active = true;
    } else {
      dot.active = false;
    }
  })
}

function handleFade(dot){
  let fade = dot.opacity;
  if (dot.active) {
    if (fade < 1){
      fade += 0.03;
      dot.opacity = Math.min(1, fade);
    }
  } else {
    if (fade > 0){
      fade -= 0.01;
      dot.opacity = Math.max(0, fade);
    }
  }
}

function update() {
  animate();
  checkCollision();
  dots.map(dot => handleFade(dot));
  ctx.clearRect(0, 0, W, H);
}

function render() {
  dots.map(dot => dot.render());
}

function main() {
  update();
  render();
  requestAnimationFrame(main);
}

displayGrid();
main();
