const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  speedX: 5,
  speedY: 5,
  color: 'blue',
};

let animationId;
let isPaused = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function update() {
  if (!isPaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.speedX = -ball.speedX;
      changeColor();
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.speedY = -ball.speedY;
      changeColor();
    }

    animationId = requestAnimationFrame(update);
  }
}

function changeColor() {
  ball.color = getRandomColor();
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

canvas.addEventListener('click', () => {
  isPaused = !isPaused;
  if (!isPaused) {
    requestAnimationFrame(update);
  }
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetAnimation);

function resetAnimation() {
  cancelAnimationFrame(animationId);
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  isPaused = false;
  ball.speedX = 5;
  ball.speedY = 5;
  ball.color = 'blue';
  update();
}

update();