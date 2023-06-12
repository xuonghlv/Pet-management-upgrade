"use strict";

// Selecting elements
const navEl = document.getElementById("sidebar");
const inputID = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputType = document.getElementById("input-type");
const inputWeight = document.getElementById("input-weight");
const inputLength = document.getElementById("input-length");
const inputColor = document.getElementById("input-color-1");
const inputBreed = document.getElementById("input-breed");
const vaccinatedChecker = document.getElementById("input-vaccinated");
const dewormedChecker = document.getElementById("input-dewormed");
const sterilizedChecker = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");
const showHealthyBtn = document.getElementById("healthy-btn");
const deleteBtn = document.getElementsByClassName("btn-danger");
const tableBodyEl = document.getElementById("tbody");
const calcBmiBtn = document.getElementById("calcBmi-btn");
const breedSelector = document.querySelector("#input-breed");

// Add click event for navbar
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

////////////////////////////
let petData = getFromStorage("petArr") || []; // pets data
let ids = []; // array to saving petID
let showHealthy = false;

// Render breed selector when pet type change
inputType.addEventListener("change", function () {
  const selectedType = this.value;
  const breeds = getFromStorage("breed array");
  const breedFilter = breeds.filter((item) => item.type === selectedType);
  breedSelector.innerHTML = "<option>Select Breed</option>"; // Reset breed option
  for (let i = 0; i < breedFilter.length; i++) {
    const breedOption = document.createElement("option");
    breedOption.innerHTML = breedFilter[i].breed;
    breedSelector.appendChild(breedOption);
  }
});

// Render pet data table
function renderTableDataFromIndex(petArr, index) {
  for (let i = index; i < petArr.length; i++) {
    const petObj = petArr[i];
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petObj.id}</th>
  <td>${petObj.petName}</td>
  <td>${petObj.age}</td>
  <td>${petObj.type}</td>
  <td>${petObj.weight} kg</td>
  <td>${petObj.petLength} cm</td>
  <td>${petObj.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${petObj.color}"></i>
  </td>
  <td><i class="bi ${
    petObj.vaccinated === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    petObj.dewormed === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    petObj.sterilized === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td class= 'bmi-${petObj.id}'>?</td>
  <td>${petObj.addDate}</td>
  <td><button id="delete-${
    petObj.id
  }" type="button" class="btn btn-danger">Delete</button>
  </td>`;
    tableBodyEl.appendChild(row);
    row.classList.add(`pet-${petObj.id}`);

    // Add event for Delete button
    document
      .getElementById(`delete-${petObj.id}`) // get Delete button with id: 'delete-..'
      .addEventListener("click", function () {
        if (confirm("Are you sure?")) {
          tableBodyEl.removeChild(row); // delete element from table
          petData = petData.filter((item) => item.id !== petObj.id); // delete 1 pet from pet data
          ids = ids.filter((id) => id !== petObj.id); // delete pet id from ID array
          saveToStorage("petArr", petData);
        }
      });
    if (
      petObj.vaccinated === false ||
      petObj.dewormed === false ||
      petObj.sterilized === false
    )
      row.classList.add("unhealthy");
  }
}
renderTableDataFromIndex(petData, 0);

// Add Submit event
submitBtn.addEventListener("click", function () {
  // Get today date
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Check input
  if (!inputID.value) {
    alert("PLease input for ID");
  } else if (ids.includes(inputID.value)) {
    alert("ID must be unique!");
  } else if (inputAge.value < 1 || inputAge.value > 15) {
    alert("Age must be between 1 and 15!");
  } else if (inputWeight.value < 1 || inputWeight.value > 15) {
    alert("Weight must be between 1 and 15!");
  } else if (inputLength.value < 1 || inputLength.value > 100) {
    alert("Length must be between 1 and 100!");
  } else if (inputType.value === "Select Type") {
    alert("Please select Type!");
  } else if (inputBreed.value === "Select Breed") {
    alert("Please select Breed!");
  } else {
    // Get value from input form saving to pet object
    const petInput = {
      id: inputID.value,
      petName: inputName.value,
      age: inputAge.value,
      type: inputType.value,
      weight: inputWeight.value,
      petLength: inputLength.value,
      color: inputColor.value,
      breed: inputBreed.value,
      vaccinated: vaccinatedChecker.checked, // => true/false
      dewormed: dewormedChecker.checked, // => true/false
      sterilized: sterilizedChecker.checked, // => true/false
      bmi: "?",
      addDate: `${day}/${month}/${year}`,
    };
    petData.push(petInput); // add 1 pet to last of pet data array (index = data.length -1)
    saveToStorage("petArr", petData);
    ids.push(petInput.id); // get id only and save to ids array

    // reset input value
    inputID.value = "";
    inputName.value = "";
    inputAge.value = "";
    inputType.value = "Select Type";
    inputWeight.value = "";
    inputLength.value = "";
    inputColor.value = "#000000";
    inputBreed.value = "Select Breed";
    vaccinatedChecker.checked = false;
    dewormedChecker.checked = false;
    sterilizedChecker.checked = false;
    // Render new pet to table
    renderTableDataFromIndex(petData, petData.length - 1);
  }
});

// Add event for Healthy pet button

showHealthyBtn.addEventListener("click", function () {
  const unHealthyEl = document.querySelectorAll(".unhealthy");
  if (showHealthy === false) {
    for (let i = 0; i < unHealthyEl.length; i++) {
      unHealthyEl[i].classList.add("hidden");
    }
    showHealthyBtn.textContent = "Show All Pet";
    showHealthy = true;
  } else {
    for (let i = 0; i < unHealthyEl.length; i++) {
      unHealthyEl[i].classList.remove("hidden");
    }
    showHealthyBtn.textContent = "Show Healthy Pet";
    showHealthy = false;
  }
});

// Add event for Calculate BMI button
function calcBmi(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].bmi = (
      data[i].type === "Dog"
        ? (data[i].weight * 703) / data[i].petLength ** 2
        : (data[i].weight * 886) / data[i].petLength ** 2
    ).toFixed(2);
    document
      .querySelector(`.pet-${data[i].id}`)
      .querySelector(`.bmi-${data[i].id}`).innerHTML = data[i].bmi;
  }
}
calcBmiBtn.addEventListener("click", function () {
  calcBmi(petData);
});
