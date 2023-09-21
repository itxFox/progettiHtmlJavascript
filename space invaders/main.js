function playClick() {  //funzione per l'audio dei bottoni
  let audio = document.getElementById("myAudio");
  audio.play();
}

function setSpeed(speed) {  //funzione per inserire nel div una stringa della difficoltà selezionata
  document.getElementById("speedSetted").innerHTML = speed;
  if (speed == 20)
    document.getElementById("levelSetted").innerHTML = "easy";
  else if (speed == 13)
    document.getElementById("levelSetted").innerHTML = "medium";
  else if (speed == 6)
    document.getElementById("levelSetted").innerHTML = "hard";
  else if (speed == 0)
    document.getElementById("levelSetted").innerHTML = "legend";
}