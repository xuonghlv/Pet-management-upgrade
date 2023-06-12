"use strict";
const petArr = getFromStorage("petArr");

// Selecting element
const inputIdSearch = document.getElementById("input-id").value;
const inputNameSearch = document.getElementById("input-name").value;
const inputTypeSearch = document.getElementById("input-type").value;
const inputBreedSearch = document.getElementById("input-breed").value;
const inputVaccinatedSearch =
  document.getElementById("input-vaccinated").checked;
const inputDewormedSearch = document.getElementById("input-dewormed").checked;
const inputSterilizedSearch =
  document.getElementById("input-sterilized").checked;
const selectTypeEl = document.getElementById("input-type");
const breedSelector = document.getElementById("input-breed");
const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");

// Render breed selector
selectTypeEl.addEventListener("change", function () {
  const type = this.value;
  const breeds = getFromStorage("breed array");
  const breedFilter = breeds.filter((item) => item.type === type);
  breedSelector.innerHTML = "<option>Select Breed</option>";
  for (let i = 0; i < breedFilter.length; i++) {
    const breedOption = document.createElement("option");
    breedOption.innerHTML = breedFilter[i].breed;
    breedSelector.appendChild(breedOption);
  }
});

// Find button click event
findBtn.addEventListener("click", function () {
  const inputIdSearch = document.getElementById("input-id").value;
  const inputNameSearch = document.getElementById("input-name").value;
  const inputTypeSearch = document.getElementById("input-type").value;
  const inputBreedSearch = document.getElementById("input-breed").value;
  const inputVaccinatedSearch =
    document.getElementById("input-vaccinated").checked;
  const inputDewormedSearch = document.getElementById("input-dewormed").checked;
  const inputSterilizedSearch =
    document.getElementById("input-sterilized").checked;
  const petArrSearch = petArr.filter(
    (item) =>
      item.id.toUpperCase().includes(inputIdSearch.toUpperCase()) &&
      item.petName.toUpperCase().includes(inputNameSearch.toUpperCase()) &&
      item.type.toUpperCase().includes(inputTypeSearch.toUpperCase()) &&
      item.breed.toUpperCase().includes(inputBreedSearch.toUpperCase()) &&
      item.vaccinated === inputVaccinatedSearch &&
      item.dewormed === inputDewormedSearch &&
      item.sterilized === inputSterilizedSearch
  );
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArrSearch.length; i++) {
    const petObj = petArrSearch[i];
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
  <td>${petObj.addDate}</td>`;
    tableBodyEl.appendChild(row);
  }
});
