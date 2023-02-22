let currentTab: number = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(tabPosition: number) {
  // This function will display the specified tab of the form ...
  var tabs: NodeListOf<HTMLDivElement> = document.querySelectorAll('.tab');
  tabs[tabPosition].style.display = 'block';

  // ... and fix the Previous/Next buttons:
  const prevBtn: HTMLElement | null = document.getElementById('prevBtn');
  const nextBtn: HTMLElement | null = document.getElementById('nextBtn');
  if (tabPosition == 0) {
    prevBtn ? (prevBtn.style.display = 'none') : null;
  } else {
    prevBtn ? (prevBtn.style.display = 'inline') : null;
  }
  if (tabPosition == tabs.length - 1) {
    nextBtn ? (nextBtn.innerHTML = 'Enviar') : null;
    setVisualValues();
  } else {
    nextBtn ? (nextBtn.innerHTML = 'Siguiente') : null;
  }

  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(tabPosition);
}

/* Set Values on final page */
function setVisualValues() {
  const form: HTMLFormElement | null = document.querySelector('form');

  if (!form) return;

  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    const idTarget: string = key.replace('form', 'show');
    const elTarget: HTMLElement | null = document.getElementById(idTarget);
    elTarget ? (elTarget.innerHTML = value.toString()) : null;
  }
}

function nextPrev(tabPosition: number) {
  // This function will figure out which tab to display
  var tabs: NodeListOf<HTMLDListElement> = document.querySelectorAll('.tab');
  // Exit the function if any field in the current tab is invalid:
  if (
    tabPosition == 1 &&
    (!validateForm('textarea') ||
      !validateForm('select') ||
      !validateForm('input'))
  ) {
    return false;
  }
  // Hide the current tab:
  tabs[currentTab].style.display = 'none';
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + tabPosition;
  // if you have reached the end of the form... :
  if (currentTab >= tabs.length) {
    //...the form gets submitted:
    const form: HTMLFormElement | null = document.querySelector('form');
    form ? form.submit() : null;
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

/* onChange select to valid elements */
document.querySelectorAll('select').forEach((select) => {
  select.addEventListener('change', (e: Event) => {
    const selectElement = e.target as HTMLSelectElement | null;

    selectElement ? selectElement.classList.remove('invalid') : null;
    selectElement ? selectElement.classList.add('valid') : null;
  });
});

/* Check formCICPC (Si / No) options*/
document.getElementById('formCICPC')?.addEventListener('change', (e: Event) => {
  const selectElement = e.target as HTMLSelectElement | null;
  const value = selectElement?.value.toLocaleLowerCase();

  const fechaDenuncia = document.getElementById(
    'formFechaDenuncia'
  ) as HTMLInputElement | null;
  const timeDenuncia = document.getElementById(
    'formTimeDenuncia'
  ) as HTMLInputElement | null;
  const fileDenuncia = document.getElementById(
    'formFileDenuncia'
  ) as HTMLInputElement | null;
  const fileRecaudos = document.getElementById(
    'formFileRecaudos'
  ) as HTMLInputElement | null;

  if (value === 'si') {
    checkParentNode(fechaDenuncia, 'grandpa')?.classList.remove('d-none');
    checkParentNode(fileDenuncia)?.classList.remove('d-none');
    checkParentNode(fileRecaudos)?.classList.remove('d-none');
  } else {
    checkParentNode(fechaDenuncia, 'grandpa')?.classList.add('d-none');
    checkParentNode(fileDenuncia)?.classList.add('d-none');
    checkParentNode(fileRecaudos)?.classList.add('d-none');

    fechaDenuncia ? (fechaDenuncia.value = '') : null;
    timeDenuncia ? (timeDenuncia.value = '') : null;
    fileDenuncia ? (fileDenuncia.value = '') : null;
    fileRecaudos ? (fileRecaudos.value = '') : null;
  }
});

const checkParentNode = (
  node: HTMLInputElement | null,
  elementType: string = 'father'
): HTMLElement | null => {
  if (!node) return null;

  if (elementType.toLocaleLowerCase() === 'grandpa') {
    const grandpa = node.parentNode?.parentNode as HTMLElement | null;
    return grandpa;
  } else {
    const father = node.parentNode as HTMLElement | null;
    return father;
  }
};

function validateForm(type: string) {
  // This function deals with validation of the form fields
  const tabs = document.querySelectorAll('.tab');
  const htmlElements: NodeListOf<HTMLInputElement> = tabs[
    currentTab
  ].querySelectorAll(`.${type}`);
  let valid = true;

  const checkboxRadio = [];
  // A loop that checks every input field in the current tab:
  for (let i = 0; i < htmlElements.length; i++) {
    /* Ignore disable elements */
    if (checkParentNode(htmlElements[i])?.classList.value.includes('d-none'))
      continue;
    if (
      checkParentNode(htmlElements[i], 'grandpa')?.classList.value.includes(
        'd-none'
      )
    )
      continue;

    // If a field is empty...
    if (!htmlElements[i].value) {
      // add an "invalid" class to the field:
      htmlElements[i].classList.remove('valid');
      htmlElements[i].classList.add('invalid');
      // and set the current valid status to false:
      valid = false;
    } else {
      htmlElements[i].classList.remove('invalid');
      htmlElements[i].classList.add('valid');
    }

    if (
      htmlElements[i].type === 'radio' ||
      htmlElements[i].type === 'checkbox'
    ) {
      checkboxRadio.push(htmlElements[i].checked);
      valid = false;
      valid = checkboxRadio.some((el) => el === true);
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName('step')[currentTab].classList.add('finish');
  }
  return valid; // return the valid status
}

function fixStepIndicator(tabPosition: number) {
  // This function removes the "active" class of all steps...
  const step = document.getElementsByClassName('step');
  for (let i = 0; i < step.length; i++) {
    step[i].className = step[i].className.replace(' active', '');
  }
  //... and adds the "active" class to the current step:
  step[tabPosition].className += ' active';
}
