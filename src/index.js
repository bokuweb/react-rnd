// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0
import firebase from "firebase";
import * as moment from 'moment';

var config = {
  apiKey: "AIzaSyAfkVIzXPqpVHpxfqlduGtaWsWJAtRYQlc",
  authDomain: "guess-kitten-age.firebaseapp.com",
  databaseURL: "https://guess-kitten-age.firebaseio.com",
  projectId: "guess-kitten-age",
  storageBucket: "guess-kitten-age.appspot.com",
  messagingSenderId: "368556986702"
};

firebase.initializeApp(config);

const favoritesRef = firebase.database().ref();                           
const kittiesList = document.getElementById("kitties");
let favoritesScores = [];

const ageInWeeks = birthDate => {
  const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;
  const diff = Math.abs((new Date).getTime() - birthDate);
  return Math.floor(diff / WEEK_IN_MILLISECONDS);
}


favoritesRef.on("value", (snapshot) => {
  const { kitties, favorites, names, birthDates } = snapshot.val();
  favoritesScores = favorites;

  kittiesList.innerHTML = kitties.map((kittiePic, index) => {

    return `
      <li>
        <img src=${kittiePic} onclick="favKittie(${index})">
        <div class="extra">
          <div class="details">
            <p class="name">${names[index]}</p>
            <p class="age">${ageInWeeks(birthDates[index])} weeks old</p>
          </div>
          <p class="score">${favorites[index]} ❤</p>
        </div>
      </li>
    `})
});

window.favKittie = (kittieID) => {
  const scoreRef = firebase.database().ref(`favorites/${kittieID}`);

  scoreRef.set(favoritesScores[kittieID] + 1);
}