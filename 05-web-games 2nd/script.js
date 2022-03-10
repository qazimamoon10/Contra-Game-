let gamebox = document.getElementById("gamebox");
let context = gamebox.getContext("2d");
let level = 0;
let lives = 4;

let enemy = [
  {
    color: "red",
    x: 100,
    y: 0,
    h: 50,
    w: 50,
    vx: 0,
    vy: 4,
    name: "enemy",
  },
  {
    color: "red",
    x: 250,
    y: 300,
    h: 50,
    w: 50,
    vx: 0,
    vy: 4,
    name: "enemy",
  },
  {
    color: "red",
    x: 400,
    y: 200,
    h: 50,
    w: 50,
    vx: 0,
    vy: 4,
    name: "enemy",
  },
  {
    color: "red",
    x: 550,
    y: 350,
    h: 50,
    w: 50,
    vx: 0,
    vy: 4,
    name: "enemy",
  },
];

let player = {
  color: "blue",
  x: 10,
  y: 350,
  h: 50,
  w: 50,
  vx: 1,
  vy: 0,
  name: "player",
};

let mushroom = {
  color: "green",
  x: 750,
  y: 350,
  h: 50,
  w: 50,
  name: "mushroom",
};

let enemyImage = new Image();
enemyImage.onload = function () {
  context.drawImage(enemyImage, enemy[0].x, enemy[0].y);
  context.drawImage(enemyImage, enemy[1].x, enemy[1].y);
  context.drawImage(enemyImage, enemy[2].x, enemy[2].y);
};
enemyImage.src = "enemy1.png";

let playerImage = new Image();
context.drawImage(playerImage, player.x, player.y);
playerImage.src = "billy.gif";

let mushroomImage = new Image();
context.drawImage(mushroomImage, mushroom.x, mushroom.y);
mushroomImage.src = "trophy5.png";

function drawBox(box) {
  context.fillStyle = box.color;
  // context.fillRect(box.x, box.y, box.w, box.h);
  console.log(box.name);
  if (box.name == "player") {
    context.drawImage(playerImage, box.x, box.y, box.w, box.h);
  } else if (box.name == "mushroom") {
    context.drawImage(mushroomImage, box.x, box.y, box.w, box.h);
  } else {
    context.drawImage(enemyImage, box.x, box.y, box.w, box.h);
  }
}

document.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 37:
      player.x -= 25;
      break;
    case 39:
      player.x += 25;
      break;
  }
});

function updateGameState() {
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].vy;
    if (enemy[i].y + enemy[i].h > gamebox.height) {
      enemy[i].vy = -1 * enemy[i].vy;
    } else if (enemy[i].y < 0) {
      enemy[i].vy = -1 * enemy[i].vy;
    }
  }
}
function resetState() {
  level = 0;
  for (let j = 0; j < enemy.length; j++) {
    enemy[j].vy = 4;
  }
  player.x = 0;
  lives = 4;
}

function checkGameOver() {
  for (let i = 0; i < enemy.length; i++) {
    if (
      player.x + player.w >= enemy[i].x &&
      player.x <= enemy[i].x + enemy[i].w &&
      enemy[i].y + enemy[i].h >= player.h + player.y
    ) {
      if (lives == 1) {
        resetState();
        alert("Game Over ");
        window.location.reload(true);
      } else {
        lives--;
        player.x = 0;
        alert("Try again, you lost one life.");
      }
    }
  }
}

function levelUp() {
  if (mushroom.x <= player.x) {
    player.x = 0;
    level++;
    for (let i = 0; i < enemy.length; i++) {
      if (enemy[i].vy < 0) enemy[i].vy = -1 * enemy[i].vy;
      enemy[i].vy++;
    }

    alert("Level up ");
  }
}

function setLevel() {
  document.getElementById("level").innerHTML = level;
  document.getElementById("enemyspeed").innerHTML =
    enemy[0].vy < 0 ? -(enemy[0].vy + 3) : enemy[0].vy - 3;
  document.getElementById("lives").innerHTML = lives;
}

function updateGame() {
  // update game state
  console.log(level);
  checkGameOver();
  updateGameState();
  levelUp();
  setLevel();

  // clear the canvas
  context.clearRect(0, 0, gamebox.width, gamebox.height);
  // draw the player
  drawBox(player);
  // draw the enemies
  for (let i = 0; i < enemy.length; i++) {
    drawBox(enemy[i]);
  }
  // draw finish
  drawBox(mushroom);

  window.requestAnimationFrame(updateGame);
}

updateGame();