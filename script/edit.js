"use strict";

// Selecting Element
const inputId = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputType = document.getElementById("input-type");
const inputWeight = document.getElementById("input-weight");
const inputLength = document.getElementById("input-length");
const inputColor = document.getElementById("input-color-1");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const breedSelector = document.getElementById("input-breed");

let petDataEdit = getFromStorage("petArr");
let petEdit;

// Edit pet function
function startEditPet(petObj) {
  petEdit = petObj;
  document.getElementById("container-form").classList.remove("hide");
  inputId.value = petEdit.id;
  inputName.value = petEdit.petName;
  inputAge.value = petEdit.age;
  inputType.value = petEdit.type;
  inputWeight.value = petEdit.weight;
  inputLength.value = petEdit.petLength;
  inputColor.value = petEdit.color;
  inputVaccinated.checked = petEdit.vaccinated;
  inputDewormed.checked = petEdit.dewormed;
  inputSterilized.checked = petEdit.sterilized;

  const breeds = getFromStorage("breed array") || [];
  console.log(breeds);
  console.log(petEdit);
  const breedsFilter =
    petEdit.type === "Dog"
      ? breeds.filter((item) => item.type === "Dog")
      : breeds.filter((item) => item.type === "Cat");
  breedSelector.innerHTML = `<option>${petEdit.breed}</option>`;
  for (let i = 0; i < breedsFilter.length; i++) {
    const breedOption = document.createElement("option");
    breedOption.innerHTML = breedsFilter[i].breed;
    breedSelector.appendChild(breedOption);
  }

  //////////////// Change pet type event
  document.getElementById("input-type").addEventListener("change", function () {
    const type = this.value;
    const breeds = getFromStorage("breed array");
    const breedsFilter = breeds.filter((item) => item.type === type);
    breedSelector.innerHTML = "<option>Select Breed</option>"; // Reload breed option
    for (let i = 0; i < breedsFilter.length; i++) {
      const breedOption = document.createElement("option");
      breedOption.innerHTML = breedsFilter[i].breed;
      breedSelector.appendChild(breedOption);
    }
  });
}

/*-------------------------------------
  SUBMIT BUTTON 
  ---------------------------------------*/
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", function () {
  // Get today date
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // CHECK INPUT

  if (inputAge.value < 1 || inputAge.value > 15) {
    alert("Age must be between 1 and 15!");
  } else if (inputWeight.value < 1 || inputWeight.value > 15) {
    alert("Weight must be between 1 and 15!");
  } else if (inputLength.value < 1 || inputLength.value > 100) {
    alert("Length must be between 1 and 100!");
  } else if (inputType.value === "Select Type") {
    alert("Please select Type!");
  } else if (breedSelector.value === "Select Breed") {
    alert("Please select Breed!");
  } else {
    // Get value from input form saving to pet object

    const petEdited = {
      id: document.getElementById("input-id").value,
      petName: document.getElementById("input-name").value,
      age: document.getElementById("input-age").value,
      type: document.getElementById("input-type").value,
      weight: document.getElementById("input-weight").value,
      petLength: document.getElementById("input-length").value,
      color: document.getElementById("input-color-1").value,
      breed: document.getElementById("input-breed").value,
      vaccinated: document.getElementById("input-vaccinated").checked, // => true/false
      dewormed: document.getElementById("input-dewormed").checked, // => true/false
      sterilized: document.getElementById("input-sterilized").checked, // => true/false
      bmi: "?",
      addDate: `${day}/${month}/${year}`,
    };
    if (confirm("Are you sure?")) {
      petDataEdit = petDataEdit.filter((item) => item.id !== petEdit.id); // delete 1 pet from pet data
      petDataEdit.push(petEdited);
      saveToStorage("petArr", petDataEdit);
      tableBodyEl.innerHTML = ""; // clear table
      renderTableData(petDataEdit, 0);
      document.getElementById("container-form").classList.add("hide");
    }
  }
});

/*-----------------------------------------
        RENDER TABLE
-------------------------------------------*/

function renderTableData(data, index) {
  for (let i = index; i < data.length; i++) {
    const petObj = data[i];
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
  <td>${petObj.addDate}</td>
  <td><button id="edit-${
    petObj.id
  }" type="button" class="btn btn-warning">Edit</button>
  </td>`;
    tableBodyEl.appendChild(row);
    document
      .getElementById(`edit-${petObj.id}`) // get edit button with id: 'edit-..'
      .addEventListener("click", function () {
        startEditPet(petObj);
      });
  }
}
renderTableData(petDataEdit, 0);
