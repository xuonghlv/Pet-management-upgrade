"use strict";

// Save data to Local Storage
function saveToStorage(key, value) {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
