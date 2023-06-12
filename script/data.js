"use strict";
// export file
function exportFile() {
  const jsonData = localStorage.getItem("petArr");
  var blob = new Blob([jsonData], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "petdata.json");
}
document.getElementById("export-btn").addEventListener("click", exportFile);

// import file
document.getElementById("import-btn").addEventListener("click", function () {
  const selectedFile = document.getElementById("input-file").files[0];
  console.log(selectedFile);
  let reader = new FileReader();
  reader.readAsText(selectedFile, "UTF-8");
  reader.onload = function () {
    // upload pet array
    let uploadContent = reader.result;
    localStorage.setItem("petArr", uploadContent);
    // upload breed array
    const breedArr = [];
    for (let i = 0; i < JSON.parse(reader.result).length; i++) {
      const breedUpload = JSON.parse(reader.result)[i].breed;
      const typeUpload = JSON.parse(reader.result)[i].type;
      let push = true;
      for (let j = 0; j < breedArr.length; j++) {
        if (breedUpload === breedArr[j].breed) {
          push = false;
        }
      }
      if (push === true) {
        const breedObj = {
          breed: breedUpload,
          type: typeUpload,
        };
        breedArr.push(breedObj);
      }
    }
    localStorage.setItem("breed array", JSON.stringify(breedArr));
    // document.getElementById("result-box").innerHTML = reader.result;
  };
  document.getElementById("input-file").value = "";
  alert("Import data successfully");
});
