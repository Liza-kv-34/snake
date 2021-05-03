"use strict";

let canvas = document.querySelector(".canvas");
let gradient = 0;
let contexst = canvas.getContext("2d");
let bacground =  new Image();
bacground.src = "img/ground.png";
let foodimage = new Image();
foodimage.src = "img/food.png";
let box = 32;
let score = 0;
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
  };
  let snake = [];
  snake[0] = {
    x: 9 * box,
    y: 10 * box
  };
  document.addEventListener("keydown",direction);
  let dire;
  function direction(event){
    if(event.keyCode == 37 && dire != "right"){
        dire = "left";
    }
   else if(event.keyCode == 38 && dire != "down"){
        dire = "up";
   }    
   else if (event.keyCode == 39 && dire != "left"){
        dire = "right";
   }
   else if (event.keyCode == 40 && dire != "up"){
         dire = "down";
   }
  }
  function eat_tail(head,ar){
    for(let i = 0; i <ar.length;i++){
      if(head.x == ar[i].x && head.y == ar[i].y){
        clearInterval(game)
        console.log('dfs,,,,,,,,,,,,,,,,,,,,,,,,,,,,g.hgjhtgkdfhgkudyghdffytgdhfbgdkfuhduk')
      }
    }
  }
  function drawGame(){
      contexst.drawImage(bacground,0,0);
      contexst.drawImage(foodimage,food.x,food.y);
      gradient = contexst.createLinearGradient(50, 30, 150, 150);
      gradient.addColorStop(0, "blue");
      gradient.addColorStop(1, "white");

      for(let i = 0; i < snake.length; i++) {
        contexst.fillStyle = i == 0 ? "white" : "red";
        contexst.fillRect(snake[i].x, snake[i].y, box, box);
      }
      contexst.fillStyle = "yellow";
      contexst.font = '50px Ariall';
      contexst.fillText(score,box*2,box*1.6)

      
      let snakex = snake[0].x;
      let snakey = snake[0].y;
      if(food.x == snakex && food.y == snakey){
        score= score + 1 ;
        food = {
          x: Math.floor((Math.random() * 17 + 1)) * box,
          y: Math.floor((Math.random() * 15 + 3)) * box,
        };
      }
      else {
        snake.pop();
      }
      if(snakex < box || snakex > box* 17 || snakey < box*3 || snakey > box*17){
        clearInterval(game);
      }
      
      if(dire == "left") snakex -= box;
      if(dire == "right") snakex += box;
      if(dire == "up") snakey -= box;
      if(dire == "down") snakey += box;
    let newhead = {
      x:snakex,
      y:snakey
    }
    eat_tail(newhead,snake);
    snake.unshift(newhead);
    
  }
  
  let game = setInterval(drawGame, 240);
