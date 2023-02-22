"use strict";
var _a;
let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
function showTab(tabPosition) {
    // This function will display the specified tab of the form ...
    var tabs = document.querySelectorAll('.tab');
    tabs[tabPosition].style.display = 'block';
    // ... and fix the Previous/Next buttons:
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (tabPosition == 0) {
        prevBtn ? (prevBtn.style.display = 'none') : null;
    }
    else {
        prevBtn ? (prevBtn.style.display = 'inline') : null;
    }
    if (tabPosition == tabs.length - 1) {
        nextBtn ? (nextBtn.innerHTML = 'Enviar') : null;
        setVisualValues();
    }
    else {
        nextBtn ? (nextBtn.innerHTML = 'Siguiente') : null;
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(tabPosition);
}
/* Set Values on final page */
function setVisualValues() {
    const form = document.querySelector('form');
    if (!form)
        return;
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
        const idTarget = key.replace('form', 'show');
        const elTarget = document.getElementById(idTarget);
        elTarget ? (elTarget.innerHTML = value.toString()) : null;
    }
}
function nextPrev(tabPosition) {
    // This function will figure out which tab to display
    var tabs = document.querySelectorAll('.tab');
    // Exit the function if any field in the current tab is invalid:
    if (tabPosition == 1 &&
        (!validateForm('textarea') ||
            !validateForm('select') ||
            !validateForm('input'))) {
        return false;
    }
    // Hide the current tab:
    tabs[currentTab].style.display = 'none';
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + tabPosition;
    // if you have reached the end of the form... :
    if (currentTab >= tabs.length) {
        //...the form gets submitted:
        const form = document.querySelector('form');
        form ? form.submit() : null;
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}
/* onChange select to valid elements */
document.querySelectorAll('select').forEach((select) => {
    select.addEventListener('change', (e) => {
        const selectElement = e.target;
        selectElement ? selectElement.classList.remove('invalid') : null;
        selectElement ? selectElement.classList.add('valid') : null;
    });
});
/* Check formCICPC (Si / No) options*/
(_a = document.getElementById('formCICPC')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (e) => {
    var _a, _b, _c, _d, _e, _f;
    const selectElement = e.target;
    const value = selectElement === null || selectElement === void 0 ? void 0 : selectElement.value.toLocaleLowerCase();
    const fechaDenuncia = document.getElementById('formFechaDenuncia');
    const timeDenuncia = document.getElementById('formTimeDenuncia');
    const fileDenuncia = document.getElementById('formFileDenuncia');
    const fileRecaudos = document.getElementById('formFileRecaudos');
    if (value === 'si') {
        (_a = checkParentNode(fechaDenuncia, 'grandpa')) === null || _a === void 0 ? void 0 : _a.classList.remove('d-none');
        (_b = checkParentNode(fileDenuncia)) === null || _b === void 0 ? void 0 : _b.classList.remove('d-none');
        (_c = checkParentNode(fileRecaudos)) === null || _c === void 0 ? void 0 : _c.classList.remove('d-none');
    }
    else {
        (_d = checkParentNode(fechaDenuncia, 'grandpa')) === null || _d === void 0 ? void 0 : _d.classList.add('d-none');
        (_e = checkParentNode(fileDenuncia)) === null || _e === void 0 ? void 0 : _e.classList.add('d-none');
        (_f = checkParentNode(fileRecaudos)) === null || _f === void 0 ? void 0 : _f.classList.add('d-none');
        fechaDenuncia ? (fechaDenuncia.value = '') : null;
        timeDenuncia ? (timeDenuncia.value = '') : null;
        fileDenuncia ? (fileDenuncia.value = '') : null;
        fileRecaudos ? (fileRecaudos.value = '') : null;
    }
});
const checkParentNode = (node, elementType = 'father') => {
    var _a;
    if (!node)
        return null;
    if (elementType.toLocaleLowerCase() === 'grandpa') {
        const grandpa = (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
        return grandpa;
    }
    else {
        const father = node.parentNode;
        return father;
    }
};
function validateForm(type) {
    var _a, _b;
    // This function deals with validation of the form fields
    const tabs = document.querySelectorAll('.tab');
    const htmlElements = tabs[currentTab].querySelectorAll(`.${type}`);
    let valid = true;
    const checkboxRadio = [];
    // A loop that checks every input field in the current tab:
    for (let i = 0; i < htmlElements.length; i++) {
        /* Ignore disable elements */
        if ((_a = checkParentNode(htmlElements[i])) === null || _a === void 0 ? void 0 : _a.classList.value.includes('d-none'))
            continue;
        if ((_b = checkParentNode(htmlElements[i], 'grandpa')) === null || _b === void 0 ? void 0 : _b.classList.value.includes('d-none'))
            continue;
        // If a field is empty...
        if (!htmlElements[i].value) {
            // add an "invalid" class to the field:
            htmlElements[i].classList.remove('valid');
            htmlElements[i].classList.add('invalid');
            // and set the current valid status to false:
            valid = false;
        }
        else {
            htmlElements[i].classList.remove('invalid');
            htmlElements[i].classList.add('valid');
        }
        if (htmlElements[i].type === 'radio' ||
            htmlElements[i].type === 'checkbox') {
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
function fixStepIndicator(tabPosition) {
    // This function removes the "active" class of all steps...
    const step = document.getElementsByClassName('step');
    for (let i = 0; i < step.length; i++) {
        step[i].className = step[i].className.replace(' active', '');
    }
    //... and adds the "active" class to the current step:
    step[tabPosition].className += ' active';
}
