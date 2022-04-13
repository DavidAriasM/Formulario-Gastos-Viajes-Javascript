const formulario = document.getElementById('formulario');
let destino;
let valor1 = document.getElementById('valor1');
let valor2 = document.getElementById('valor2');
let presupuesto = document.getElementById('presupuesto');
let contenedorDetalle = document.getElementById('lista-gastos');
let gastosStorage = [];
let contadorId = 0;
let filaDetalle = document.createElement('div');

formulario.addEventListener('submit', calcularGastos);

window.addEventListener('load', cargaLocalStorage());

function cargaLocalStorage() {

    if (localStorage.getItem('gastos')) {
        contenedorDetalle.innerHTML = "";
        JSON.parse(localStorage.getItem('gastos')).forEach(data => {

            filaDetalle = document.createElement('div');

            filaDetalle.innerHTML += `
                    <span>${ data.destino }</span><br>
                    <span>${ data.presupuesto }</span><br>
                    <span>${ data.gastosTotal }</span><br>
                    <span>${ data.saldoFinal }</span><br>
                    <span><button class="btnBorrar" onclick="borrarFila(${ data.id })">X</button></span><br>
                `
            filaDetalle.classList.add('gastos-detalle');
            contenedorDetalle.appendChild(filaDetalle);
        });
    }
}

function calcularGastos(event) {
    event.preventDefault();

    let gastosTotal = parseInt(valor1.value) + parseInt(valor2.value);
    let saldoTotal = parseInt(presupuesto.value) - gastosTotal;
    let presupuestoFinal = presupuesto.value;
    destino = document.getElementById('destino-viaje').value;
    cargarUI(destino, gastosTotal, saldoTotal, presupuestoFinal);
    ingresarLocalStorage(destino, gastosTotal, saldoTotal, presupuestoFinal);
}

cargarUI = (destino, gastosTotal, saldoTotal, presupuestoFinal) => {

    if (presupuesto.value === '' || valor1.value === '' || valor2.value === '') {
        alert('Debe rellenar todos los campos con información')
    } else {
        filaDetalle.innerHTML = `
        <span>Destino: ${ destino }</span><br>
        <span>Presupuesto inicial: ${ presupuestoFinal }</span><br>
        <span>Gasto total: ${ gastosTotal }</span><br>
        <span>Saldo restante: ${ saldoTotal }</span>
    `
        filaDetalle.classList.add('gastos-detalle');
        contenedorDetalle.appendChild(filaDetalle);
        formulario.reset();
    }
}

ingresarLocalStorage = (destino, gastosTotal, saldoTotal, presupuestoInicial) => {

    let gastosStorage = JSON.parse(localStorage.getItem('gastos')) || [];
    contadorId = gastosStorage.length + 1;
    gastosStorage.push({
        id: contadorId,
        destino: destino,
        presupuesto: presupuestoInicial,
        gastosTotal: gastosTotal,
        saldoFinal: saldoTotal
    });
    localStorage.setItem('gastos', JSON.stringify(gastosStorage))
    cargaLocalStorage();
}

borrarFila = (id) => {
    let gastosStorage = JSON.parse(localStorage.getItem('gastos'))
    for (let i = 0; i < gastosStorage.length; i++) {
        if (id === gastosStorage[i].id) {
            let indice = gastosStorage.findIndex(gastosStorage => gastosStorage.id === id);
            gastosStorage.splice(indice, 1);
            localStorage.setItem('gastos', JSON.stringify(gastosStorage));
        }
    }
    cargaLocalStorage();
}