"use strict";
window.addEventListener("load", start);

function start() {
    console.log("JavaScript is running");
    requestAnimationFrame(tick);
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
}
/* MODEL */
const player = {
    x: 0,
    y: 0,
    speed: 100,
    moving: false,
    direction: undefined
};

const controls = {
    left: false,
    right: false,
    up: false,
    down: false
}

// Lyt efter keydown hændelser
function keyDown(event) {
    switch(event.keyCode) {
        case 37: // Venstre pil
            controls.left = true;
            break;
        case 39: // Højre pil
            controls.right = true;
            break;
        case 38: // Op pil
            controls.up = true;
            break;
        case 40: // Ned pil
            controls.down = true;
            break;
    }
}

// Lyt efter keyup hændelser
function keyUp(event) {
    switch(event.keyCode) {
        case 37: // Venstre pil
            controls.left = false;
            break;
        case 39: // Højre pil
            controls.right = false;
            break;
        case 38: // Op pil
            controls.up = false;
            break;
        case 40: // Ned pil
            controls.down = false;
            break;
    }
}

let lastTimestamp = 0;

function tick(timestamp) {
    requestAnimationFrame(tick);

    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp
    movePlayer(deltaTime);
    displayPlayerAtPosition();
    displayPlayerAnimation();
}

function displayPlayerAnimation() {
    const visualPlayer = document.querySelector("#player");

    if (player.moving) {
        visualPlayer.classList.add("animate");
        visualPlayer.classList.remove("up", "down", "left", "right");
        visualPlayer.classList.add(player.direction);
    } else {
        visualPlayer.classList.remove("animate");
    }
}

function displayPlayerAtPosition() {
    const visualPlayer = document.querySelector("#player");
    visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}

function movePlayer(deltaTime) {
    player.moving = false;

    const newPos = {
        x: player.x,
        y: player.y
    }
    
    if (controls.left) {
        player.moving = true;
        player.direction = "left"
        newPos.x -= player.speed * deltaTime;
    } else if (controls.right) {
        player.moving = true;
        player.direction = "right"
        newPos.x += player.speed * deltaTime;
    }

    if (controls.up) {
        player.moving = true;
        player.direction = "up"
        newPos.y -= player.speed * deltaTime;
    } else if (controls.down) {
        player.moving = true;
        player.direction = "down";
        newPos.y += player.speed * deltaTime;
    }

    if (canMoveTo(newPos)) {
        player.x = newPos.x;
        player.y = newPos.y;
    }
}

function canMoveTo(pos) {
    if (pos.x < 0 || pos.x > 484 ||
        pos.y < 0 || pos.y > 340) {
    return false;
    } else {
        return true;
    }
}



