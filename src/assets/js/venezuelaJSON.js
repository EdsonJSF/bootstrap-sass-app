const venezuelaJSON = async () => {
  const res = await fetch("./assets/json/venezuela.json");
  const result = await res.json();
  addSelectFn(result);
};

const addSelectFn = (vnzlaJSON) => {
  const formEstado = document.getElementById("formEstado");

  formEstado.innerHTML = /* html */ `
    <option selected disabled value="">
      Seleccione un Estado
    </option>
  `;

  let estados = "";
  vnzlaJSON.forEach(({ estado }) => {
    estados += /* html */ `
      <option value="${estado}">
        ${estado}
      </option>
    `;
  });
  formEstado.innerHTML += estados;

  formEstado.addEventListener("change", () => {
    const formCiudad = document.getElementById("formCiudad");
    formCiudad.value = "";

    formCiudad.innerHTML = /* html */ `
      <option selected disabled value="">
        Seleccione una Ciudad
      </option>
    `;

    const estadoSelected = vnzlaJSON.filter(
      ({ estado }) => estado === formEstado.value
    )[0];

    let ciudades = "";
    estadoSelected.ciudades.forEach((ciudad) => {
      ciudades += /* html */ `
      <option value="${ciudad}">
        ${ciudad}
      </option>
    `;
    });
    formCiudad.innerHTML += ciudades;

    formCiudad.classList.remove("invalid");
    formCiudad.classList.remove("valid");
  });
};

venezuelaJSON();
