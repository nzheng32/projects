// project 2b
// Nan Zheng
// Sponge Bob
//Object Instancing wiith star at line 50, 54, 58, 62, 66, 70 with function defined at line 97


let time = 0;  // records the passage of time, used to move the objects
let t2 = 0;
let k = 0;
let m =0;
let out = 0;

// this is called once at the start of the program
function setup() {
  createCanvas(600, 600, WEBGL);

  let fov = 90.0;  // 60 degrees field of view
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// this is called repeatedly to create new per-frame images
function draw() {

  background(158, 255, 233);  // light blue background

  // set the virtual camera position

  if (time <= 20) {
    camera(0, 0, 150 - time * 3, 0, 0, 0, 0, 1, 0);  // from, at, up
    k = 150 - time * 3;
  }else if (time < 50) {
    camera(0, 20-time, k, 0, 0, 0, 0, 1, 0);
  }
  

  // include a little bit of light even in shadows
  ambientLight(60, 60, 60);

  // set the light position
  pointLight(255, 255, 255, -100, -900 , 300);
  pointLight(255, 255, 255, -100, -100, 300);

  noStroke();  // don't draw polygon outlines
  push();
  drawcharacter();
  drawjelly();
  drawbackground();
  push();
  translate(0, -400,-300);
  star();
  pop();
  push();
  translate(-50, -300,-300);
  star();
  pop();
  push();
  translate(-190, -340,-300);
  star();
  pop();
  push();
  translate(-300, -220,-300);
  star();
  pop();
  push();
  translate(190, -270,-300);
  star();
  pop();
  push();
  translate(290, -350,-300);
  star();
  pop();
  pop();



  time += 0.1;  // update time
  t2 += 0.02;
  m = m+0.1;
  if (20 == m) {
    t2 = 0;
  }
}
function drawjelly() {
  let box_axis = createVector (0.0, 1.0, 0.0);
  push();
  let heigh = time %5;
  if (30 > m) {
    translate(0, heigh*3.7, 0);
    scale(1.5,1.5,1.5);
    rotate(-t2, box_axis);
    translate(40,0,30-m);
    fill(255,0,0);
    sphere(1);
    pop();
  }
}
function star() {
  push();
  fill(255,255,0);
  scale(2,2,2);
  push();
  rotateX(PI);
  translate(0,1,0);
  cone(2, 6.5, 5, 16);
  pop();
  push();
  translate(-4.2,2,0);
  rotateZ(PI/2);
  cone(2, 6.5, 5, 16);
  pop();
  push();
  translate(0,6,0);
  cone(2, 6.5, 5, 16);
  pop();
  push();
  translate(4.2,2,0);
  rotateZ(-PI/2);
  cone(2, 6.5, 5, 16);
  pop();
  
  push();
  translate(1.5,4,0);
  rotateZ(-PI/4);
  cone(2, 6.5, 5, 16);
  pop();
  push();
  translate(-1.5,4,0);
  rotateZ(PI/4);
  cone(2, 6.5, 5, 16);
  pop();
  push();
  translate(1.5,-1,0);
  rotateZ(PI*5/4);
  cone(2, 6.5, 5, 16);
  pop();
  push();
  translate(-1.5,-1,0);
  rotateZ(-PI*5/4);
  cone(2, 6.5, 5, 16);
  pop();
  pop();
}
function drawbackground() {
  push();
  translate(0,0,-5);
  scale(10,10,10);
  
  push();
  fill(255,195,73);
  scale(1,2,1);
  sphere(2);
  pop();
  
  push();
  fill(0,0,0);
  translate(0,0,1.5);
  box(1,2,1);
  
  push();
  fill(46,245,15);
  translate(0,-4,0);
  rotateX(PI);
  
  push();
  rotateZ(PI/6);
  translate(-0.7,0,1.2);
  cone(0.5,2);
  pop();
  push();
  rotateZ(-PI/6);
  translate(0.7,0,1.2);
  cone(0.5,2);
  pop();
  push();
  translate(0,0,1.2);
  cone(0.5,2);
  pop();
  
  pop();
  
  pop();
  pop();
  push();
  fill(230,222,151);
  translate(0,469,0);
  box(1500,900,900);
  pop();

}
function drawcharacter() {
  let box_axis = createVector (0.0, 1.0, 0.0);
  push();
  scale(1.5,1.5,1.5);
  ang = -t2;
  if (m > 30) {
    let k = ang;
    ang = 0;
  }
  rotate(ang, box_axis);
  translate(40,0,0);
  drawhead();
  drawbody();
  drawleg();
  drawfeet();
  pop();

}
function bubbles() {
  fill(random(0,255),random(0,255),random(0,255));

}
function random(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}
function drawfeet() {
  fill(0,0,0);
  push();
  translate(-2, 12,0);
  rotateX(PI/2);
  scale(1,1,0.8);
  cylinder(0.8,2.5);
  pop();
  push();
  translate(-2, 12,1);
  scale(1,0.8,1.2);
  sphere(1.2);
  pop();
  push();
  translate(-2, 12,-1);
  scale(1,0.8,1.2);
  sphere(1);
  pop();

  push();
  translate(2, 12,0);
  rotateX(PI/2);
  scale(1,1,0.8);
  cylinder(0.8,2.5);
  pop();
  push();
  translate(2, 12,1);
  scale(1,0.8,1.2);
  sphere(1.2);
  pop();
  push();
  translate(2, 12,-1);
  scale(1,0.8,1.2);
  sphere(1);
  pop();
}
function drawleg() {
  push();
  fill(255,255,51);
  translate(0,1.75,0);
  cylinder(0.35,3.8);
  pop();
}
function drawbody() {
  if ( m > 30) {
    angle = time %5;
    angle = angle + 1;
  } else {
    angle = 0;
  }
  //TORSO
  push();

  translate(0, 5.75, 0);
  //body
  push();
  fill(255,255,255);
  box(10, 1.5, 3);
  drawtie();
  //sleeve
  push();
  translate(-5.3,0,0);
  rotateX(PI);
  rotateZ(-PI * angle/6);
  cone(1.2, 2);
  push();
  fill(255,255,51);
  translate(0,-2,0);
  cylinder(0.4,2.5);
  
  push();
  scale(1,1,0.8);
  translate(0,-1.7,0);
  sphere(0.6);
  pop();
  pop();
  pop();
  
  push();
  translate(5.3,0,0);
  rotateX(PI);
  rotateZ(PI*angle/6);
  cone(1.2, 2);
  push();
  fill(255,255,51);
  translate(0,-2,0);
  cylinder(0.4,2.5);
  
  push();
  scale(1,1,0.8);
  translate(0,-1.7,0);
  sphere(0.6);
  pop();
  pop();
  pop();
  //END SLEEVE
  pop();
  //END BODY

  //pants
  push();
  fill(232,147,62);
  translate(0, 1.5,0);
  box(10, 1.5, 3);

  drawbelt();

  //leg part
  push();
  translate(2,1.1,0);
  cylinder(1.2,0.7);
  drawleg();
  pop();

  push();
  translate(-2,1.1,0);
  cylinder(1.2,0.7);
  drawleg();
  pop();
  //END LEG PARTS
  pop();
  //END PANTS

  pop();
}
function drawtie() {
  push();
  fill(255,0,0);
  translate(0,-0.54, 0.6);
  box(1,0.4,2);
  pop();

  push();
  fill(255,0,0);
  translate(0,0.5,1.1);
  box(1,1.5,1);
  pop();
}
function drawbelt() {
  push();
  fill(0,0,0);
  translate(-3.5, 0,0);
  box(1.5,0.5,3.1);
  pop();
  push();
  fill(0,0,0);
  translate(-1,0,0);
  box(1.5,0.5,3.1);
  pop();
  push();
  fill(0,0,0);
  translate(1, 0,0);
  box(1.5,0.5,3.1);
  pop();
  push();
  fill(0,0,0);
  translate(3, 0,0);
  box(1.5,0.5,3.1);
  pop();
}
function  drawhead() {
  push();
  fill(255,255,51);
  box(10, 10, 3);
  pop();

  //draweyes
  push();
  draweyes();
  drawmouth();
  drawnose();
  pop();

}
function draweyes() {
  //WHITE
  //LEFT
  push();
  fill(255,255,255);
  translate(- 1.7, -1.65, 0.5);
  rotateZ(PI/2);
  torus(1.75, 1.3);
  pop();
  //RIGHT
  push();
  fill(255,255,255);
  translate(1.7, -1.65, 0.5);
  rotateZ(PI/2);
  torus(1.75, 1.3);
  pop();
  push();
  fill(255,255,255);
  translate(- 1.7, -1.65, 0.5);
  rotateZ(PI/2);
  torus(1.75, 1.3);
  pop();
  //PUPIL
  //RIGHT
  push();
  fill(0,0,0);
  translate(1.7, -1.65,1.5);
  rotateX(PI/2);
  cylinder(1.3, 0.1);
  pop();
  //LEFT
  push();
  fill(0,0,0);
  translate(-1.7, -1.65,1.5);
  rotateX(PI/2);
  cylinder(1.3, 0.1);
  pop();
}
function drawmouth() {
  push();
  fill(0,0,0);
  translate(0, 2.5,1.5);
  box(7,0.1,0.1);
  pop();
  push();
  fill(255,255,255);
  translate(-0.8,3,1.5);
  box(1,1,0.1);
  pop();
  push();
  fill(255,255,255);
  translate(0.8,3,1.5);
  box(1,1,0.1);
  pop();
}
function drawnose() {
  push();
  fill(255,255,51);
  rotateX(PI/2);
  rotateX(PI/18);
  translate(0,2.5,-1);
  cylinder(0.5, 3);
  pop();
}
