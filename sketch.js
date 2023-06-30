const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground
var rope
var fruit
var link
var bunny
var button
var backgroundImg
var bunnyImg
var fruitImg
var buttonImg
var blink
var eat
var sad
var bgSound
var cutSound
var sadSound
var eatingSound
var airSound
var airBalloonButton
var muteButton


function preload () 
{

  bgSound = loadSound("sound1.mp3")
  cutSound = loadSound("rope_cut.mp3")
  sadSound = loadSound("sad.wav")
  eatingSound = loadSound("eating_sound.mp3")
  airSound = loadSound("air.wav")

  backgroundImg = loadImage("background.png")
  bunnyImg = loadImage("Rabbit-01.png")
  fruitImg = loadImage ("melon.png")
  //buttonImg = loadImage ("cut_button.png")
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")

  blink.playing = true
  eat.playing = true
  eat.looping = false
  sad.playing = true
  sad.looping = false
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  bgSound.play()
  bgSound.setVolume(0.5)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  ground = new Ground (200,690,600,20)
  rope = new Rope (6,{x:245, y:30})

  var options = {
    density: 0.001
  }

  blink.frameDelay = 20
  eat.frameDelay = 20
  sad.frameDelay = 20

  bunny = createSprite(250,610,100,100)
  bunny.scale = 0.2
  //bunny.addImage (bunnyImg)
  bunny.addAnimation ("blinking", blink)
  bunny.addAnimation ("eating", eat)
  bunny.addAnimation ("sad", sad)
  bunny.changeAnimation ("blinking")

  button = createImg ("cut_button.png")
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(drop)

  fruit = Bodies.circle(300,50,15,options)
  Matter.Composite.add(rope.body,fruit)

  link = new Link (rope,fruit)
  rectMode(CENTER)
  ellipseMode(RADIUS)
  textSize = 50

  imageMode(CENTER)

  airBalloonButton = createImg ("balloon.png")
  airBalloonButton.position(10,210)
  airBalloonButton.size(150,100)
  airBalloonButton.mouseClicked(airBlow)

  muteButton = createImg ("mute.png")
  muteButton.position(425,20)
  muteButton.size(50,50)
  muteButton.mouseClicked(mute)


}

function draw() 
{
  background(51);
  Engine.update(engine);

  image (backgroundImg, width/2, height/2, 500, 700) 

  ground.show()
  rope.show()

  if (fruit!=null) {
    image(fruitImg,fruit.position.x,fruit.position.y,60,60)
  }

  //image(fruitImg, fruit.position.x, fruit.position.y, 60,60)
  //ellipse (fruit.position.x,fruit.position.y,15,15)


  if (collide(fruit,bunny) == true) {
    eatingSound.play()
    bunny.changeAnimation("eating")
  }

  /*if (collide(fruit,ground.body) == true) {
    sadSound.play()
    bunny.changeAnimation("sad")
  }*/

  if (fruit!=null && fruit.position.y >= 650) {
    sadSound.play()
    bunny.changeAnimation("sad")
    fruit = null
  }


  drawSprites() 
}

function drop () {
  cutSound.play()
  rope.break()
  link.detach()
  link = null
}

function collide (body, sprite) {
  if (body!=null) {
    var d = dist (body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (d < 50) {
      World.remove(engine.world,fruit)
      fruit = null
      return true
    }
    else {
      return false
    }
  }
}

function airBlow () {
  Matter.Body.applyForce (fruit, {x:0, y:0}, {x:0.01, y:0})
  airSound.play()

}

function mute () {
  if(bgSound.isPlaying()) {
    bgSound.stop()
  }

  else {
    bgSound.play()
  }
}

