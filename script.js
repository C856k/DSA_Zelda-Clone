"use strict";
const player = {
    x: 0, 
    y: 0,
    speed: 25
}

const controls = {
    left: false,
    right: false,
    up: false,
    down: false
}

function handleKeyDown(event) {
    switch(event.key) {
        case 'a':
            controls.left = true;
            break;
        case 'd':
            controls.right = true;
            break;
        case 'w':
            controls.up = true;
            break;
        case 's':
            controls.down = true;
            break;
    }
}

function handleKeyUp(event) {
    switch(event.key) {
        case 'ArrowLeft':
            controls.left = false;
            break;
        case 'ArrowRight':
            controls.right = false;
            break;
        case 'ArrowUp':
            controls.up = false;
            break;
        case 'ArrowDown':
            controls.down = false;
            break;
    }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);


function start() {
    console.log("JavaScript is running");

    displayPlayerAtPosition();
}


function displayPlayerAtPosition() {
    const visualPlayer = document.querySelector("#player");
    visualPlayer.style.transform = `translate(${player.x}px ${player.y})`;
}

let lastTimestamp = 0;
function tick(timestamp) {
    requestAnimationFrame(tick);

    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    movePlayer(deltaTime);
    
    displayPlayerAtPosition();
    displayPlayerAnimation();
}

function displayPlayerAnimation() {
    const visualPlayer = document.querySelector("#player");

    if(player.moving) {
        visualPlayer.classList.add("animate");
        visualPlayer.classList.remove("up", "down", "left", "right");
        visualPlayer.classList.add(player.direction);
    } else {
        visualPlayer.classList.remove("animate");
    }
}

function movePlayer() {
    player.moving = false;

    const newPos = {
        x: player.x,
        y: player.y
    }

    if (controls.left) {
        player.moving = true;
        player.direction = "left";
        newPos.x -= player.speed * deltaTime;
    } else if (controls.right) {
        player.moving = true;
        player.direction = "right";
        newPos.x += player.speed * deltaTime;
    }

    if (controls.up) {
        player.moving = true;
        player.direction = "up"
        newPos.y -= player.speed * deltaTime;
    } else if (controls.down) {
        player.moving = true;
        player.direction = "down"
        newPos.y += player.speed *deltaTime;
    }

    if (canMoveTo(newPos)) {
        player.x = newPos.x;
        player.y = newPos.y;
    }
}

function canMoveTo(pos) {
    if (pos.x < 0 || pos.y < 0) {
        return false;
    } else {
    return true;
    }
}