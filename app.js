document.addEventListener('DOMContentLoaded', () => {
  const gameEl = document.getElementById('game');
  const blocks = document.getElementsByClassName('block');
  const gameOverEl = document.getElementById('game-over');
  const scoreEl = document.getElementById('score');
  const playBtn = document.getElementById('play-btn');

  for (let i = 0; i < 1250; i++) {
    let block = document.createElement('div');
    block.classList.add('block');
    block.setAttribute('data-position', i);
    gameEl.appendChild(block);
  }

  const left = -1;
  const right = 1;
  const down = 50;
  const up = -50;

  let interval;
  let speed = 300;
  let acceleration = 0.9;
  let direction = right;
  let score = 0;

  let snakeArr = [621, 622, 623, 624, 625];

  function drawSnake() {
    checkCollision();

    snakeArr.push(snakeArr[snakeArr.length - 1] + direction);
    let removedTail = snakeArr.shift();

    if (snakeArr.every(i => blocks[i])) {
      snakeArr.forEach(i => blocks[i].classList.add('snake'));
      blocks[removedTail].classList.remove('snake');

      if (blocks[snakeArr[snakeArr.length - 1]].classList.contains('apple')) {
        score++;
        scoreEl.textContent = score;

        speed <= 50 ? (speed = speed) : (speed = speed * acceleration);
        clearInterval(interval);
        interval = setInterval(drawSnake, speed);

        snakeArr.unshift(snakeArr[0] - (snakeArr[1] - snakeArr[0]));

        ranApple();
      }
    }
  }

  function directionOutcome(e) {
    switch (e.keyCode) {
      case 39:
        direction === left ? (direction = left) : (direction = right);
        break;
      case 40:
        direction === up ? (direction = up) : (direction = down);
        break;
      case 37:
        direction === right ? (direction = right) : (direction = left);
        break;
      case 38:
        direction === down ? (direction = down) : (direction = up);
        break;
    }

    checkCollision();
  }

  function checkCollision() {
    if (
      (snakeArr[snakeArr.length - 1] + direction) % 50 === 0 ||
      (snakeArr[snakeArr.length - 1] + direction) % 50 === 49 ||
      !blocks[snakeArr[snakeArr.length - 1] + direction] ||
      blocks[snakeArr[snakeArr.length - 1] + direction].classList.contains(
        'snake'
      )
    ) {
      clearInterval(interval);
      gameOverEl.textContent = 'Game over! Your final score is ' + score;
    }
  }

  function ranApple() {
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].classList.remove('apple');
    }
    let apple = blocks[Math.floor(Math.random() * 1250)];
    apple.classList.add('apple');
  }

  document.addEventListener('keydown', directionOutcome);
  playBtn.addEventListener('click', () => {
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].classList.remove('snake');
    }
    gameOverEl.textContent = '';
    snakeArr = [621, 622, 623, 624, 625];
    speed = 300;
    direction = right;
    score = 0;
    ranApple();
    interval = setInterval(drawSnake, speed);
  });
});
