const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let nextDirection = "RIGHT";
let food = getRandomFoodPosition();
let score = 0;
let gameSpeed = 250; // Adjust speed (higher = slower)

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") nextDirection = "LEFT";
    if (key === 38 && direction !== "DOWN") nextDirection = "UP";
    if (key === 39 && direction !== "LEFT") nextDirection = "RIGHT";
    if (key === 40 && direction !== "UP") nextDirection = "DOWN";
}

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "green";
    snake.forEach((part) => {
        ctx.fillRect(part.x, part.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(part.x, part.y, box, box);
    });

    let head = { ...snake[0] };
    direction = nextDirection; // Apply new direction only once per frame

    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }

    if (
        head.x < 0 || head.y < 0 || 
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.some(part => part.x === head.x && part.y === head.y)
    ) {
        alert("Game Over! Score: " + score);
        snake = [{ x: 200, y: 200 }];
        direction = "RIGHT";
        nextDirection = "RIGHT";
        score = 0;
    }

    snake.unshift(head);
}

function gameLoop() {
    draw();
    setTimeout(gameLoop, gameSpeed);
}

gameLoop();
