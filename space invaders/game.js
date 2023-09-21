//variabili globali
let id = null, id2 = null, id3 = null;
let widthPage = window.innerWidth; //ampiezza area di gioco
let imgSize = 50;
let posLeftCannon;
let nShoots;
let score;
let speedFrame= localStorage.getItem("speedFrame");  //prende il valore dal main della velocità impostata
let enemySpeed = 10;
let cannonSpeed= 10;
let sizeBorderGamePage = 4;
let marginGamePage = 40;
let widthGamePage = widthPage - imgSize - marginGamePage - sizeBorderGamePage;
let maxJumps = (400 / imgSize) - 1;
let heightJump = imgSize;
let btnStart = document.getElementById("btStart");
document.getElementById("animateCannon").style.width = widthGamePage;

let propPercent = ((widthPage - imgSize - 100) * 100) / widthPage;
document.getElementById("container").style.width = propPercent + "%;";

function preMove() {  //funzione che muove l'invasore a destra e sinistra prima dell'avvio del gioco
    nShoots=0;
    score=0;
    const elem = document.getElementById("animate");
    let posLeft = 0;
    id = setInterval(frame3, speedFrame);
    id2 = setInterval(changeImage(elem), 0);
    let state = "right";

    function frame3() {

        if (state === "right") {
            if (posLeft < widthGamePage) {
                posLeft += enemySpeed;
                elem.style.left = posLeft + "px";

            } else {
                state = "left";
            }
        }

        if (state === "left") {
            if (posLeft > 0) {
                posLeft -= enemySpeed;
                elem.style.left = posLeft + "px";
            } else {
                state = "right";
            }
        }
    }
}




function myMove() {  //funzione che muove l'invasore all'avvio fino ad arrivare a fine area di gioco
    
    document.getElementById("btReset").className = "buttonOff";
    document.getElementById("btReset").disabled = true;
    document.getElementById("btStart").className = "buttonOff";
    document.getElementById("btStart").disabled = true;
    document.getElementById("btShoot").className = "buttonShoot";
    document.getElementById("btShoot").disabled = false;

    const elem = document.getElementById("animate");
    let posLeft = 0, posTop = 0;
    id = setInterval(frame2, speedFrame);
    id2 = setInterval(changeImage(elem), 0);
    let state = "right";
    let latestPose = "right";
    let jumps = 0;

    function frame2() {  

        if (state === "right" && jumps < maxJumps) {
            if (posLeft < widthGamePage) {
                posLeft += enemySpeed;
                elem.style.left = posLeft + "px";

            } else {
                latestPose = "right";
                state = "down";
            }
        }

        if (state === "down" && jumps < maxJumps) {
            if (posTop < heightJump) {
                posTop += enemySpeed;
                elem.style.top = posTop + "px";
            } else {
                if (latestPose === "right")
                    state = "left";
                else if (latestPose === "left")
                    state = "right";
                heightJump += imgSize;
                jumps++;
            }
        }

        if (state === "left" && jumps < maxJumps) {
            if (posLeft > 0) {
                posLeft -= enemySpeed;
                elem.style.left = posLeft + "px";
            } else {
                latestPose = "left";
                state = "down";
            }
        }
        if (jumps === maxJumps) {
            if (posLeft > 0) {
                posLeft -= enemySpeed;
                elem.style.left = posLeft + "px";
            } else {
                gameOver(id, id2);
            }
        }
    }
}




function moveCannon() {  //funzione che muove il cannone a destra e sinistra SEMPRE
    const elem = document.getElementById("itemCannon");
    posLeftCannon = 0;
    id = setInterval(frame3, speedFrame);
    let state = "right";

    function frame3() {

        if (state === "right") {
            if (posLeftCannon < widthGamePage) {
                posLeftCannon += cannonSpeed;
                elem.style.left = posLeftCannon + "px";

            } else {
                state = "left";
            }
        }

        if (state === "left") {
            if (posLeftCannon > 0) {
                posLeftCannon -= cannonSpeed;
                elem.style.left = posLeftCannon + "px";
            } else {
                state = "right";
            }
        }
    }
}




function changeImage(elem) {  //funzione che cambia continuamente l'immagine dell'invasore
    setInterval(function () {
        if (elem.src.includes("images/space%20invader.png")) {
            elem.src = "images/space invader2.png";
        } else {
            elem.src = "images/space invader.png";
        }
        console.log(elem.src);
    }, 100);
}

function reset() {  //funzione per resettare il gioco allo stato iniziale mantenendo però la difficoltà e il nametag
    document.getElementById("buttonScore").innerHTML = "score: " + 0;
    document.getElementById("container").innerHTML = '<img src="images/space invader.png" id ="animate" alt="">';
    const elem = document.getElementById("animate");
    elem.style.left = "0px";
    elem.style.top = "0px";
    heightJump = imgSize;
    document.getElementById("btStart").className = "button";
    document.getElementById("btStart").disabled = false;
    document.getElementById("btShoot").className = "buttonShootOff";
    document.getElementById("btShoot").disabled = true;
    document.getElementById("btReset").className = "buttonOff";
    document.getElementById("btReset").disabled = true;
}

function gameOver() {  //funzione gameover
    clearInterval(id);
    clearInterval(id2);
    document.getElementById("container").innerHTML = '<h1 style="text-align:center; margin: auto; color:white;">GAME OVER</h1>';
    document.getElementById("btReset").className = "button";
    document.getElementById("btReset").disabled = false;
    document.getElementById("btShoot").className = "buttonShootOff";
    document.getElementById("btShoot").disabled = true;
}

function haiVinto() {  //funzione vittoria
    clearInterval(id);
    clearInterval(id2);
    document.getElementById("container").innerHTML = '<h1  style="text-align:center; margin: auto; color:white;">YOU WON</h1>';
    document.getElementById("btReset").className = "button";
    document.getElementById("btReset").disabled = false;
    document.getElementById("btShoot").className = "buttonShootOff";
    document.getElementById("btShoot").disabled = true;
}

function shoot() {  //funzione sparare
    nShoots++;
    let bullet = document.createElement("img");
    bullet.src = "images/bullet.png";
    bullet.style.position = "absolute";
    bullet.style.bottom = "0px";
    bullet.style.left = posLeftCannon + "px";
    bullet.style.width = "15px";
    document.getElementById("container").appendChild(bullet);

    let animate = document.getElementById("animate");

    let id3 = setInterval(frame, speedFrame);

    function frame() {  //funzione movimento del proiettile
        bullet.style.bottom = (parseInt(bullet.style.bottom) + 10) + "px";

        if (touching(animate, bullet)) { //verifica se invasore e proiettile si incontrano
            haiVinto();
            clearInterval(id3);
        }

        if (nShoots === 1 && touching(animate, bullet)) {  //stabilisce il punteggio ottenuto in base ai tentativi per colpire l'invasore e se invasore e proiettile si incontrano
            score = 10;
            document.getElementById("buttonScore").innerHTML = "score: " + score;
        }

        else if (nShoots === 2 && touching(animate, bullet)){
            score = 8;
            document.getElementById("buttonScore").innerHTML = "score: " + score;
        }
        else if (nShoots === 3 && touching(animate, bullet)){
            score = 6;
            document.getElementById("buttonScore").innerHTML = "score: " + score;
        }
        else if (nShoots === 4 && touching(animate, bullet)){
            score = 4;
            document.getElementById("buttonScore").innerHTML = "score: " + score;
        }
        else if (nShoots === 5 && touching(animate, bullet)){
            score = 2;
            document.getElementById("buttonScore").innerHTML = "score: " + score;
        }
        else if (nShoots === 6 && touching(animate, bullet)){
            score = 1;
            document.getElementById("buttonScore").innerHTML = "score: " + score;
        }
        else if (nShoots > 6 && touching(animate, bullet)){
            score = 0;
            document.getElementById("buttonScore").innerHTML = "score: " + score;
        }

        if (bullet.style.bottom === "770px") {  //se il proiettile superà il confine sopra al box viene cancellato
            clearInterval(id3);
            container.removeChild(bullet);
        }
    }

    function touching(d1, d2) {  //funzione che verifica il contatto tra le 2 immagini
        let ox = Math.abs(d1.x - d2.x) < (d1.x < d2.x ? d2.width : d1.width);
        let oy = Math.abs(d1.y - d2.y) < (d1.y < d2.y ? d2.height : d1.height);
        return ox && oy;
    }
}