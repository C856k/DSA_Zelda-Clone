"use strict";
window.addEventListener("load", start);

function start() {
    createView();
    console.log("JavaScript is running");
    requestAnimationFrame(tick);
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    displayTiles();
}


const controls = {
    left: false,
    right: false,
    up: false,
    down: false
}

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
    //showDebugging();
}

function createView() {
    const background = document.querySelector("#background");
    
for(let row=0; row < GRID_ROWS; row++) {
    for(let col=0; col < GRID_COLS; col++) {
        const tile = document.createElement("div");
    tile.classList.add("tile");
    background.append(tile)
    }
    
}
background.style.setProperty("--GRID_COLS", GRID_COLS);
background.style.setProperty("--GRID_ROWS", GRID_ROWS);
background.style.setProperty("--TILE_SIZE", TILE_SIZE + "px");
}

function displayTiles() {
    const visualTiles = document.querySelectorAll("#background .tile");

    for(let row=0; row<GRID_ROWS; row++) {
        for(let col=0; col<GRID_COLS; col++) {
            const modelTile = getTileAtCoord({row, col});
            const visualTile = visualTiles[row*GRID_COLS+col];

            visualTile.classList.add(getClassForTiletype(modelTile));
        }
    }
}

function getClassForTiletype( tileType ) {
    switch(tileType) {
        case 0: 
            return "grass"; 
        case 1:
            return "path";
        case 2:
            return "cliff"
        case 3:
            return "water";
        case 4:
            return "mine";
        case 5:
            return "floor_wood";
        case 6:
            return "floor_stone";
        case 7:
            return "lava";
        case 8:
            return "wall";
        case 9:
            return "redwall";
        case 10:
            return "abyss"
        case 11:
            return "floor_planks";
        case 12:
            return "flowers";
        case 13:
            return "fence_hori";
        case 14:
            return "well";
        case 15:
            return "fence_vert";
        case 16:
            return "door";
        case 17:
            return "gate";
        case 18:
            return "tree";
        case 19:
            return "floor_carpet";
        default:
            return "unknown" 
    }
}

function updateView() {}

function displayPlayerAtPosition() {
	const visualPlayer = document.getElementById("player");
	visualPlayer.style.translate = `${player.x - player.regX}px ${
		player.y - player.regY
	}px`;
}


function displayPlayerAnimation() {
    const visualPlayer = document.getElementById("player");
    if (player.moving) {
        visualPlayer.classList = "animate";
        visualPlayer.classList.add(player.direction);
    } else {
        visualPlayer.classList.remove("animate");
    }
}


const player = {
    x: 40,
    y: 75,
    hitbox: {
        x: 2,
        y: 16,
        width: 18,
        height: 11
    },
    regX: 10,
    regY: 27,
    speed: 110,
    moving: false,
    direction: undefined
};

/*
0: grass
1: path
2: cliff
3: water
4: mine
5: floor_wood
6: floor_stone
7: lava
8: wall
9: redwall
10: abyss
11: floor_planks
12: flowers
13: fence_hori
14: well
15: fence_vert
16: door
17: gate
18: tree
19: floor_carpet
20: 
*/
const tiles = [
    [9,9,9,9,9,9,12,12,12,0,3,0,0,0,3,12,0,3,0,0,18,14,0],
    [9,5,5,5,5,9,12,14,12,0,3,0,0,0,6,0,18,3,0,0,0,18,0],
    [9,5,5,19,5,9,0,0,0,0,3,0,0,0,3,3,3,3,0,18,0,0,0],
    [9,5,5,19,5,9,0,0,0,0,3,0,0,1,1,1,1,1,0,8,12,12,8],
    [9,9,9,16,9,9,0,0,0,0,3,0,0,1,0,15,0,1,8,6,6,6,8],
    [0,0,0,1,0,0,0,0,1,1,6,1,1,1,0,15,12,1,6,6,6,6,8],
    [0,0,0,1,0,0,0,0,1,0,3,0,0,0,0,15,0,0,8,8,8,8,8],
    [0,0,0,1,1,1,1,1,1,0,3,3,3,3,3,3,3,3,3,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,1,0,0,0,2,2,2,2,2,2,3,2,2,2,2,2],
    [0,0,15,12,15,0,0,0,1,0,0,0,2,2,2,2,2,2,3,2,2,2,2,2],
    [0,0,0,13,0,0,0,0,1,0,0,0,2,2,2,2,2,2,3,2,2,2,2],
    [0,0,0,0,0,0,0,8,6,8,0,0,2,2,2,2,2,2,3,2,2,2,2],
    [0,0,0,0,0,0,0,8,8,8,0,0,2,2,2,2,2,2,3,2,2,2,2],
    [0,0,18,18,0,0,0,0,0,0,18,18,2,2,2,2,2,2,3,2,2,2,2],
    [0,0,18,18,0,0,0,0,0,0,0,18,2,2,2,2,2,2,3,2,2,2,2]
]

const GRID_COLS = tiles[0].length;
const GRID_ROWS = tiles.length;
const TILE_SIZE = 32;

function getTileAtCoord({row, col}) {
    return tiles[row] [col];
}

function coordFromPostion (object) {
    return {
        row: Math.floor(object.y / TILE_SIZE),
        col: Math.floor(object.x / TILE_SIZE),
    };
}

function positionFromCoord({ row, col}) {
    return { x: col * TILE_SIZE, y: row * TILE_SIZE};
}


function movePlayer(deltaTime) {
    player.moving = false;

    const newPos = {
        x: player.x,
        y: player.y
    }
    const diagonalSpeed = (player.speed * Math.sqrt(2)) / 2;

    if (controls.left) {
        player.moving = true;
        newPos.x -= diagonalSpeed * deltaTime;
        player.direction = "left";
    }
    if (controls.right) {
        player.moving = true;
        newPos.x += diagonalSpeed * deltaTime;
        player.direction = "right";
    }
    if (controls.up) {
        player.moving = true;
        newPos.y -= diagonalSpeed * deltaTime;
        player.direction = "up";
    }
    if (controls.down) {
        player.moving = true;
        newPos.y += diagonalSpeed * deltaTime;
        player.direction = "down";
    }

    if (canMoveTo(newPos)) {
        player.x = newPos.x;
        player.y = newPos.y;
    }
}

function canMoveTo({x, y}) {
    const {row,col} = coordFromPostion({x,y})
    if (row < 0 || row >= GRID_ROWS ||
        col < 0 || col >= GRID_COLS) {
    return false;
    } 
    const tile = getTileAtCoord({ row, col});
    switch (tile) {
        case 2:
        case 3:
        case 7:
        case 8:
                return false;
    }
    return true
}
   
function highlight({ row, col }) {
    const visualTiles = document.querySelectorAll("#background .tile");
    visualTiles[row * GRID_COLS + col].classList.add("highlight");
}

function unhighlight({ row, col}) {
    const visualTiles = document.querySelectorAll("#background .tile");
    visualTiles[row * GRID_COLS + col].classList.remove("highlight");
}

function showDebugging() {
    showDebuggingTileUnderPlayer();
    showPlayerRect();
    showPlayerReg();
    showPlayerHitbox();
}

let lastPlayerCoord = { row: 1, col: 1};

function showPlayerRect() {
    const player = document.getElementById("player");
    if(!player.classList.contains("showRect")) {
        player.classList.add("showRect");
    }
}

function showPlayerReg() {
    const visualPlayer = document.getElementById("player");
    if (!visualPlayer.classList.contains("showReg")) {
        visualPlayer.classList.add("showReg");
    }

    visualPlayer.style.setProperty("--regX", player.regX + "px");
    visualPlayer.style.setProperty("--regY", player.regY + "px");
}

function showPlayerHitbox() {
    const visualPlayer = document.getElementById("player");
    if(!visualPlayer.classList.contains("showHitbox")) {
        visualPlayer.classList.add("showHitbox");
    }
    visualPlayer.style.setProperty("--hitbox_x", player.hitbox.x + "px");
    visualPlayer.style.setProperty("--hitbox_y", player.hitbox.y + "px");
    visualPlayer.style.setProperty("--hit_width", player.hitbox.width + "px");
    visualPlayer.style.setProperty("--hitbox_height", player.hitbox.height + "px");
}

function showDebuggingTileUnderPlayer() {
    const playerCoord = coordFromPostion(player);
    if (
        playerCoord.row !== lastPlayerCoord.row ||
        playerCoord.col !== lastPlayerCoord.col
    ) {
        unhighlight(lastPlayerCoord);
        highlight(playerCoord);
    }
    lastPlayerCoord = playerCoord;
}













