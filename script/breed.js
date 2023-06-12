"use strict";

// selecting input element
const inputBreedEl = document.getElementById("input-breed");
const inputTypeEl = document.getElementById("input-type");

// selecting button element
const submitBtn = document.getElementById("submit-btn");

// selecting table element
const tableBody = document.getElementById("tbody");

// Set entry value
let breedArr = JSON.parse(localStorage.getItem("breed array")) || [];
renderBreedTable(0);
deletePet();

// Function

// Render table
function renderBreedTable(fromID) {
  for (let i = fromID; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i}</td>
    <td>${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>
    <td><button type="button" class="delete-${breedArr[i].breed} delete-btn btn btn-danger">Delete</button></td>`;
    row.classList.add(`breedRow-${i}`);
    tableBody.appendChild(row);
  }
}

// Add delete event
function deletePet() {
  const deleteBtns = document.querySelectorAll(".delete-btn");
  for (let i = 0; i < deleteBtns.length; i++) {
    let breed = breedArr[i].breed;
    const delrow = document.querySelector(`.breedRow-${i}`);
    deleteBtns[i].addEventListener("click", function () {
      breedArr = breedArr.filter((item) => item.breed !== breed);
      tableBody.removeChild(delrow);
      localStorage.setItem("breed array", JSON.stringify(breedArr));
      const rownew = tableBody.querySelectorAll("tr");
      for (i = 0; i < rownew.length; i++) {
        rownew[i].querySelector("td").innerHTML = `${i}`;
      }
      //
    });
  }
}

// Add click event for Submit button
submitBtn.addEventListener("click", function () {
  // Check input data
  if (!inputBreedEl.value || inputTypeEl.value === "Select Type") {
    alert("Invalid value, please try again!");
  } else {
    // get data to breed array
    let inputData = {
      breed: inputBreedEl.value,
      type: inputTypeEl.value,
    };
    breedArr.push(inputData);
    // save data to Local storage
    localStorage.setItem("breed array", JSON.stringify(breedArr));
    // render data to table (render input item only)
    renderBreedTable(breedArr.length - 1);
    // Reset input value
    inputBreedEl.value = "";
    inputTypeEl.value = "Select Type";
    deletePet();
  }
});
