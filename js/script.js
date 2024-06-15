const canvas = document.getElementById("canvas");
canvas.width = 640;
canvas.height = 640;

const ctx = canvas.getContext("2d");

let objects = new Image();
objects.src = "img/objects.png";

let water = new Image();
water.src = "img/water.png";

let character = new Object();
character.img = new Image();
character.img.src = "img/character.png";
character.x = 320;
character.y = 576;
character.move = 0;

let key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = "";


const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 3, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 3, 0, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function main() {

    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, 640, 640);

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0 || map[y][x] === 3) ctx.drawImage(objects, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);
            if (map[y][x] === 1 || map[y][x] === 2) ctx.drawImage(water, 0, 128, 32, 32, 32 * x, 32 * y, 32, 32);
            if (map[y][x] === 2) ctx.drawImage(objects, 32, 64, 32, 32, 32 * x, 32 * y, 32, 32);
            if (map[y][x] === 3) ctx.drawImage(objects, 32, 288, 32, 32, 32 * x, 32 * y, 32, 32);
        }
    }

    ctx.drawImage(character.img, 32, 0, 32, 32, character.x, character.y, 32, 32);

    addEventListener("keydown", keydownfunc, false);
    addEventListener("keyup", keyupfunc, false);
    addEventListener("keydown", open_omikuji, false);
    // addEventListener("keyup", open_omikuji, false);

    if (character.move === 0) {
        if (key.left === true) {
            let x = character.x / 32;
            let y = character.y / 32;
            if (x > 0) {
                x--;
                if (map[y][x] === 0 || map[y][x] === 2) {
                    character.move = 32;
                    key.push = "left";
                }
            }
        }
        if (key.up === true) {
            let x = character.x / 32;
            let y = character.y / 32;
            if (y > 0) {
                y--;
                if (map[y][x] === 0 || map[y][x] === 2) {
                    character.move = 32;
                    key.push = "up";
                }
            }
        }
        if (key.right === true) {
            let x = character.x / 32;
            let y = character.y / 32;
            if (x < 19) {
                x++;
                if (map[y][x] === 0 || map[y][x] === 2) {
                    character.move = 32;
                    key.push = "right";
                }
            }
        }
        if (key.down === true) {
            let x = character.x / 32;
            let y = character.y / 32;
            if (y < 19) {
                y++;
                if (map[y][x] === 0 || map[y][x] === 2) {
                    character.move = 32;
                    key.push = "down";
                }
            }
        }
    }

    if (character.move > 0) {
        character.move -= 4;
        if (key.push === "left") character.x -= 4;
        if (key.push === "up") character.y -= 4;
        if (key.push === "right") character.x += 4;
        if (key.push === "down") character.y += 4;
    }

    requestAnimationFrame(main);
}
addEventListener("load", main(), false);

function keydownfunc(event) {
    let key_code = event.keyCode;
    if (key_code === 37) key.left = true;
    if (key_code === 38) key.up = true;
    if (key_code === 39) key.right = true;
    if (key_code === 40) key.down = true;
    event.preventDefault();
}

function keyupfunc(event) {
    let key_code = event.keyCode;
    if (key_code === 37) key.left = false;
    if (key_code === 38) key.up = false;
    if (key_code === 39) key.right = false;
    if (key_code === 40) key.down = false;
}

const random2 = Math.floor(Math.random() * 3);
let atari;
if (random2 === 0) oinori = 320;
if (random2 === 1) oinori = 384;
if (random2 === 2) oinori = 576;

let check = true;
function open_omikuji(event) {
    let charaposi = character.x + character.y;
    console.log(oinori);
    if (check) {

        if (charaposi === oinori) {
            let key_code = event.keyCode;
            if (key_code === 13) {
                const random = Math.floor(Math.random() * 6);
                let omikuji;
                if (random === 0) omikuji = "大吉じゃ、良かったの";
                if (random === 1) omikuji = "吉じゃ、まぁまぁじゃの";
                if (random === 2) omikuji = "中吉じゃ、わるぅない";
                if (random === 3) omikuji = "小吉じゃ、そんなもんじゃ";
                if (random === 4) omikuji = "末吉じゃ、下から見ればわるぅない";
                if (random === 5) omikuji = "凶じゃの・・・";
                alert(omikuji)
                check = false;
                console.log(key_code);
            }
        }
    } else {
        if (check === false)
            alert("時を戻します")
        window.location.reload();
    }
}

document.getElementById("btn_omikuji").onclick = function () {
    window.location.reload();
}

// document.getElementById("btn_omikuji").onclick = function () {
//     const random = Math.floor(Math.random() * 6);
//     let omikuji;
//     if (random === 0) omikuji = "大吉";
//     if (random === 1) omikuji = "吉";
//     if (random === 2) omikuji = "中吉";
//     if (random === 3) omikuji = "小吉";
//     if (random === 4) omikuji = "末吉";
//     if (random === 5) omikuji = "凶";
// }