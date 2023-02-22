var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Enviar";
    setVisualValues();
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

/* Set Values on final page */
function setVisualValues() {
  const regForm = document.getElementById("regForm");
  const formData = new FormData(regForm);

  for (const [key, value] of formData.entries()) {
    const idTarget = key.replace("form", "show");
    const elTarget = document.getElementById(idTarget);
    if (elTarget) {
      elTarget.innerHTML = value;
    }
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (
    n == 1 &&
    (!validateForm("textarea") ||
      !validateForm("select") ||
      !validateForm("input"))
  )
    return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

/* onChange select to valid elements */
document.querySelectorAll("select").forEach((select) => {
  select.addEventListener("change", (e) => {
    e.target.classList.remove("invalid");
    e.target.classList.add("valid");
  });
});

/* Check formCICPC (Si / No) options*/
document.getElementById("formCICPC").addEventListener("change", (e) => {
  const value = e.target.value.toLocaleLowerCase();

  const fechaDenuncia = document.getElementById("formFechaDenuncia");
  const timeDenuncia = document.getElementById("formTimeDenuncia");
  const fileDenuncia = document.getElementById("formFileDenuncia");
  const fileRecaudos = document.getElementById("formFileRecaudos");

  if (value === "si") {
    fechaDenuncia.parentNode.parentNode.classList.remove("d-none");
    fileDenuncia.parentNode.classList.remove("d-none");
    fileRecaudos.parentNode.classList.remove("d-none");
  } else {
    fechaDenuncia.parentNode.parentNode.classList.add("d-none");
    fileDenuncia.parentNode.classList.add("d-none");
    fileRecaudos.parentNode.classList.add("d-none");

    fechaDenuncia.value = "";
    timeDenuncia.value = "";
    fileDenuncia.value = "";
    fileRecaudos.value = "";
  }
});

function validateForm(type) {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;

  const checkboxRadio = [];

  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName(type);
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    /* Ignore disable elements */
    if (y[i].parentNode.classList.value.includes("d-none")) continue;
    if (y[i].parentNode.parentNode.classList.value.includes("d-none")) continue;

    // If a field is empty...
    if (!y[i].value) {
      // add an "invalid" class to the field:
      y[i].classList.remove("valid");
      y[i].classList.add("invalid");
      // and set the current valid status to false:
      valid = false;
    } else {
      y[i].classList.remove("invalid");
      y[i].classList.add("valid");
    }

    if (y[i].type === "radio" || y[i].type === "checkbox") {
      checkboxRadio.push(y[i].checked);
      valid = false;
      valid = checkboxRadio.some((el) => el === true);
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].classList.add("finish");
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
