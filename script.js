"use strict";
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnroll = document.querySelector(".btn--roll");
const btnnew = document.querySelector(".btn--new");
const btnhold = document.querySelector(".btn--hold");
const cur0el = document.getElementById("current--0");
const cur1el = document.getElementById("current--1");
const player0el = document.querySelector(".player--0");
const player1el = document.querySelector(".player--1");

let scores, curscore, activeplayer, playing;

const starting = function () {
  activeplayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;
  curscore = 0;
  scores = [0, 0];

  player0el.classList.add("player--active");
  player1el.classList.remove("player--active");
  diceEl.classList.add("hidden");

  cur0el.textContent = 0;
  cur1el.textContent = 0;

  player0el.classList.remove("player--winner");
  player1el.classList.remove("player--winner");
};

starting();

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  curscore = 0;
  player0el.classList.toggle("player--active");
  player1el.classList.toggle("player--active");
};

btnroll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      curscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        curscore;
    } else {
      switchplayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  if (playing) {
    scores[activeplayer] += curscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    if (scores[activeplayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      switchplayer();
    }
  }
});

btnnew.addEventListener("click", starting);
