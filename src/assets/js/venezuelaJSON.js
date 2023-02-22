"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const venezuelaJSON = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('./assets/json/venezuela.json');
    const result = yield res.json();
    addSelectFn(result);
});
const addSelectFn = (vnzlaJSON) => {
    const formEstado = document.querySelector('#formEstado');
    if (!formEstado)
        return;
    formEstado.innerHTML = /* html */ `
    <option selected disabled value="">
      Seleccione un Estado
    </option>
  `;
    let estados = '';
    vnzlaJSON.forEach(({ estado }) => {
        estados += /* html */ `
      <option value="${estado}">
        ${estado}
      </option>
    `;
    });
    formEstado.innerHTML += estados;
    formEstado.addEventListener('change', () => {
        const formCiudad = document.querySelector('#formCiudad');
        if (!formCiudad)
            return;
        formCiudad.value = '';
        formCiudad.innerHTML = /* html */ `
      <option selected disabled value="">
        Seleccione una Ciudad
      </option>
    `;
        const estadoSelected = vnzlaJSON.filter(({ estado }) => estado === formEstado.value)[0];
        let ciudades = '';
        estadoSelected.ciudades.forEach((ciudad) => {
            ciudades += /* html */ `
      <option value="${ciudad}">
        ${ciudad}
      </option>
    `;
        });
        formCiudad.innerHTML += ciudades;
        formCiudad.classList.remove('invalid');
        formCiudad.classList.remove('valid');
    });
};
venezuelaJSON();
