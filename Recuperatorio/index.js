//--------------------------------------------------------------------CONSTATES---------------------------------------------------------------------
const arrayDeDatos = `[
    {"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},
    {"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},
    {"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},
    {"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},
    {"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},
    {"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}
]`;

const checkboxes = [
    {"title": "ID", "name": "entidadId", "value": "id", "entidad": "veicuclo"},
    {"title": "Modelo", "name": "entidadModelo", "value": "modelo", "entidad": "veicuclo"},
    {"title": "Año Favorito", "name": "entidadAnoFab", "value": "anoFab", "entidad": "veicuclo"},
    {"title": "Velocidad Maxima", "name": "entidadVelMax", "value": "velMax", "entidad": "veicuclo"},
    {"title": "Altura Maxima", "name": "entidadAltMax", "value": "altMax", "entidad": "aereo"},
    {"title": "Autonomia", "name": "entidadAutonomia", "value": "autonomia", "entidad": "aereo"},
    {"title": "Cantidad Puertas", "name": "entidadCantPue", "value": "cantPue", "entidad": "aereo"},
    {"title": "Cantidad Ruedas", "name": "entidadCantRue", "value": "cantRue", "entidad": "villano"},
];
//--------------------------------------------------------------------ENTIDADES---------------------------------------------------------------------
// para hacer el id necesita ser reduce + 1
class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
        this.id = id > 0 ? id : 1;
        this.modelo = modelo != null ? modelo : "MODELO";
        this.anoFab = anoFab > 0 ? anoFab : 1;
        this.velMax = velMax  > 0 ? velMax : 1;
    }
}

class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
        super(id, modelo, anoFab, velMax);
        this.altMax = altMax > 0 ? altMax : 1;
        this.autonomia = autonomia > 0 ? autonomia : 1;
      }
}

class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
        super(id, modelo, anoFab, velMax);
        this.cantPue = cantPue > 0 ? cantPue : 1;
        this.cantRue = cantRue > 0 ? cantRue : 1;
      }
}

//--------------------------------------------------------------------iNDEX.JS---------------------------------------------------------------------

const filtrarPor = (entidades) => {
    let componenteSelect = document.getElementById("selectEntidades");
    let value = componenteSelect.value;
    if (value == "Todos") {
        return entidades;
    }
    if (value == "Aereo") {
        return entidades.filter(e => e instanceof Aereo);
    }
    if (value == "Terrestre") {
        return entidades.filter(e => e instanceof Terrestre);
    }
}
const boton = (abmComponent, text, funcion) => {
    let button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", funcion);
    abmComponent.appendChild(button);
}

const crearFila = (filaDe, datos, dato, filters, identificador, idTarget) => {
    filaDe.setAttribute("id", dato.id);
    filters.map(column => {
        
        let columnaDato = document.createElement("td");
        let text = " ";
        if (dato[column.value]) {
            text = dato[column.value]
        }
        let textoColumna = document.createTextNode(text);
        columnaDato.appendChild(textoColumna);
        columnaDato.setAttribute("entidad", identificador);
        columnaDato.setAttribute("name", column.name);
        columnaDato.setAttribute("visible", true);
        if (column.value == "id") {
            columnaDato.onclick = (e) => {
                idTarget = e.target.innerText;
                tablaABM(filters, datos, idTarget);
            }
        }
        filaDe.appendChild(columnaDato);
    })
}

const crearEntidad = (entidad) => {
    const {id, modelo, anoFab, velMax} = entidad;

    if (entidad.hasOwnProperty("altMax")) {
        return new Aereo(id,modelo, anoFab, velMax, entidad.altMax, entidad.autonomia);
    } else {
        return new Terrestre(id,modelo, anoFab, velMax, entidad.cantPue, entidad.cantRue);
    }
}

const generaArrayDeDatos = (arrayDatos) => {
    let datos = JSON.parse(arrayDatos);
    return datos.map(data =>crearEntidad(data));
};

const ocultar = (nameProp, componenteNombre) => {
    let componentes = document.getElementsByTagName(componenteNombre);
    for (let index = 0; index < componentes.length; index++) {
        let componete = componentes[index];
        if (componete.hasAttribute('name')) {
            if (componete.getAttribute('name') == nameProp) {
                if (componete.getAttribute('visible') == "true") {
                    componete.setAttribute("visible", "false");
                    componete.style = "display: none";
                } else {
                    componete.setAttribute("visible", "true");
                    componete.style = "display: visible";
                }
            }
        }
    }
}

const mostrarColumnas = (nameProp) => {
    ocultar(nameProp, "th");
    ocultar(nameProp, "td");
};

const crearCheckBoxs = (arrayDeChecks) => {
    
    let container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    if (arrayDeChecks != null) {
        arrayDeChecks.map(prop => {
            
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = prop.name;
            checkbox.value = prop.value
            checkbox.checked = true;
            
            let label = document.createElement('label');
            label.for = prop.name;
            label.innerHTML = prop.title;

            checkbox.onclick = () => mostrarColumnas(prop.name);
        
            container.appendChild(checkbox);
            container.appendChild(label);
        });
    }
}

const ordenar = (entidades, propiedad) => {
    return entidades.sort((a, b) => {
        if(a[propiedad] == b[propiedad]) {
          return 0; 
        }
        if(a[propiedad] < b[propiedad]) {
          return 1;
        }
        return -1;
      });
}
const ocultarTabla = (filters, datos, idTarget) => {
    let dynamicTable = document.getElementById('dynamicTable');
    dynamicTable.style = "display: none";
    tablaABM(filters, datos, idTarget);
}
const ocultarABM = () => {
    let abmComponent = document.getElementById('abmComponent');
    abmComponent.style = "display: none";
}
const crearTabla = (filters, datos) => {
    if (filters != null &&  datos != null) {
        let idTarget = undefined;
        let dynamicTable = document.getElementById('dynamicTable');
        while (dynamicTable.firstChild) {
            dynamicTable.removeChild(dynamicTable.firstChild);
        }
        
        dynamicTable.style = "width:100%";

        //<--Filas Titulos-->
        let fila = document.createElement("tr");
        filters.map(dato => {
            let columna = document.createElement("th");
            let textoColumna = document.createTextNode(dato.title);
            columna.appendChild(textoColumna);
            columna.setAttribute("entidad", dato.entidad);
            columna.setAttribute("name", dato.name);
            columna.setAttribute("value", dato.value);
            columna.setAttribute("visible", true);
            fila.appendChild(columna);
            dynamicTable.appendChild(fila);
        });
        //<--Filas Entidades-->
        datos.map(dato => {
            let filaDato = document.createElement("tr");
            if (dato instanceof Aereo) {
                crearFila(filaDato, datos, dato, filters, "aereo", idTarget);
            } else {
                crearFila(filaDato, datos, dato, filters, "terrestre", idTarget);
            }
            dynamicTable.appendChild(filaDato);
        })

        //<--Boton-->
        let filaBoton = document.createElement("tr");
        boton(filaBoton, "Agregar", () => ocultarTabla(filters, datos, idTarget));
        dynamicTable.appendChild(filaBoton);

    }
}
const abmVehiculo = (arrayDeChecks, abmComponent, mostrarSolo) => {
    if (arrayDeChecks != null) {
        let mostrar = arrayDeChecks.filter( item => mostrarSolo.includes(item.value));
        mostrar.map(prop => {
                let label = document.createElement('label');
                label.for = prop.name;
                label.innerHTML = `${prop.title}: `;
                
                let inputText = document.createElement('input');
                inputText.type = 'text';
                inputText.name = prop.name;
                inputText.id = prop.value;

                let saltoDeLinea = document.createElement('br');
                abmComponent.appendChild(label);
                abmComponent.appendChild(inputText);
                abmComponent.appendChild(saltoDeLinea);
            }
        );
    }
}
const abmPropsEspeciales = (arrayDeChecks, abmComponent, mostrarSolo) => {
    if (arrayDeChecks != null) {
        let mostrar = arrayDeChecks.filter( item => mostrarSolo.includes(item.value));
        mostrar.map(prop => {
                let label = document.createElement('label');
                label.for = prop.name;
                label.innerHTML = `${prop.title}: *`;
                
                let inputText = document.createElement('input');
                inputText.type = 'text';
                inputText.name = prop.name;

                let saltoDeLinea = document.createElement('br');

                abmComponent.appendChild(label);
                abmComponent.appendChild(inputText);
                abmComponent.appendChild(saltoDeLinea);
            }
        );
    }
}
const tablaABM = (arrayDeChecks, arrayEntidades, idEntidad) => {
    if (arrayDeChecks != null) {
        let abmComponent = document.getElementById('abmComponent');
        abmComponent.style = "display: visible";
        while (abmComponent.firstChild) {
            abmComponent.removeChild(abmComponent.firstChild);
        }
        let title = document.createElement('h3');
        title.innerHTML = 'Formulario ABM';
        abmComponent.appendChild(title);
        
        let mostrarABMPersona = ["modelo", "anoFab", "velMax"];
        abmVehiculo(arrayDeChecks, abmComponent, mostrarABMPersona);
        
        let labelSelect = document.createElement('label');
        labelSelect.for = "tipo";
        labelSelect.innerHTML = 'Tipo: ';

        let select = document.createElement('select');
        select.id = "selectAbmTipo";
        let optionTerrestre = document.createElement('option');
        let opcionAereo = document.createElement('option');
        opcionAereo.value = 'Aereo'
        opcionAereo.textContent = 'Aereo';
        optionTerrestre.value = 'Terrestre'
        optionTerrestre.textContent = 'Terrestre';
        select.appendChild(opcionAereo);
        select.appendChild(optionTerrestre);
                
        let saltoDeLinea = document.createElement('br');

        abmComponent.appendChild(labelSelect);
        abmComponent.appendChild(select);
        abmComponent.appendChild(saltoDeLinea);
        let mostrarABMEspeciales = ["altMax", "autonomia", "cantPue", "cantRue"];
        abmPropsEspeciales(arrayDeChecks, abmComponent, mostrarABMEspeciales);
        
        
        boton(abmComponent, "Alta", () => altaEntidad(arrayEntidades));
        boton(abmComponent, "Modificar", () => modificarntidad(arrayEntidades, idEntidad));
        boton(abmComponent, "Eliminar", () => EliminarEntidad(arrayEntidades, idEntidad));
        boton(abmComponent, "Cancelar", () => Cancelar(arrayEntidades));
    }
}
//--------------------------------------------------------------------Funciones---------------------------------------------------------------------

const calcularPromedio = (entidades) =>  {
    if (entidades != undefined) {
        let arrayVelocidades = entidades.map(entidad => entidad.velMax);
        let acumulador = 0;
        let sumaDeEdades = arrayVelocidades.reduce(
            (valorPrevio, valorPresente) => valorPrevio + valorPresente,
            acumulador
        );
        let imputVelPromedio = document.getElementById('imputVelPromedio');

        imputVelPromedio.value = sumaDeEdades / entidades.length;
    }
}
const idDinamico = (datos) => {
    let ids = datos.map( d => d.id);
    let valorInicial = 0
    let ultimoID = ids.reduce(
        (previousID, currentID) => previousID < currentID ? currentID : previousID,
        valorInicial
      );
    return ultimoID + 1;
}

const altaEntidad = (arrayEntidades) => {
    let id = idDinamico(arrayEntidades);
    let modelo;
    let anoFab;
    let altMax;
    let velMax;
    let autonomia;
    let cantPue;
    let cantRue;

    let componentesImput = document.getElementsByTagName("input");
    for (let index = 0; index < componentesImput.length; index++) {
        let input = componentesImput[index];
        if (input.getAttribute('id') == "modelo") {
            modelo = input.value;
        }
        if (input.getAttribute('id') == "anoFab") {
            anoFab = input.value;
        }
        if (input.getAttribute('id') == "velMax") {
            velMax = input.value;
        }
        if (input.getAttribute('id') == "altMax") {
            altMax = input.value;
        }
        if (input.getAttribute('id') == "autonomia") {
            autonomia = input.value;
        }
        if (input.getAttribute('id') == "cantPue") {
            cantPue = input.value;
        }
        if (input.getAttribute('id') == "cantRue") {
            cantRue = input.value;
        }
    }

    let tipo = document.getElementById("selectAbmTipo");
    if (tipo.value == "Aereo") {
        arrayEntidades.push(new Aereo(id, modelo, anoFab, velMax, altMax, autonomia));
    } else {
        arrayEntidades.push(new Terrestre(id, modelo, anoFab, velMax, cantPue, cantRue));
    }
    crearTabla(checkboxes, arrayEntidades);
    ocultarABM();
}
const encotrarIndex = (arrayEntidades, idABorrar) => {
    for (let index = 0; index < arrayEntidades.length; index++) {
        if (arrayEntidades[index].id == idABorrar) {
            return index;
        }
    }

} 
const modificarntidad = (arrayEntidades, idABorrar) => {
    if (idABorrar != undefined) {
        let entidad = arrayEntidades.find( dato => dato.id == idABorrar);
    
        let componentesImput = document.getElementsByTagName("input");
        for (let index = 0; index < componentesImput.length; index++) {
            let input = componentesImput[index];
            if (input.getAttribute('id') == "modelo") {
                if (input.value != "") {
                    entidad.modelo = input.value;
                }
            }
            if (input.getAttribute('id') == "anoFab") {
                if (input.value != "") {
                    entidad.anoFab = input.value;
                }
            }
            if (input.getAttribute('id') == "velMax") {
                if (input.value != "") {
                    entidad.velMax = input.value;
                }
            }
            if (input.getAttribute('id') == "altMax") {
                if (input.value != "") {
                    entidad.altMax = input.value;
                }
            }
            if (input.getAttribute('id') == "autonomia") {
                if (input.value != "") {
                    entidad.autonomia = input.value;
                }
            }
            if (input.getAttribute('id') == "cantPue") {
                if (input.value != "") {
                    entidad.cantPue = input.value;
                }
            }
            if (input.getAttribute('id') == "cantRue") {
                if (input.value != "") {
                    entidad.cantRue = input.value;
                }
            }
        }
        let index = encotrarIndex(arrayEntidades, idABorrar);
        if (index != undefined) {
            arrayEntidades[index] = entidad;
        }   
    }
    
    crearTabla(checkboxes, arrayEntidades);
    ocultarABM();
}
const EliminarEntidad = (arrayEntidades, idABorrar) => {
    let index = encotrarIndex(arrayEntidades, idABorrar);
    if (index != undefined) {
        arrayEntidades.splice(index,1);
    }
    crearTabla(checkboxes, arrayEntidades);
    ocultarABM();
}
const Cancelar = (arrayEntidades) => {
    crearTabla(checkboxes, arrayEntidades);
    ocultarABM();
}

window.addEventListener("load", () => {
    let entidades = generaArrayDeDatos(arrayDeDatos)
    let filtro = entidades;
    console.log(entidades);

    document.addEventListener('DOMContentLoaded', crearCheckBoxs(checkboxes), false);
    document.addEventListener('DOMContentLoaded', crearTabla(checkboxes, entidades), false);

    let botonCalcular = document.getElementById('botonCalcular');
    botonCalcular?.addEventListener("click", () => calcularPromedio(filtro));

    let componenteSelect = document.getElementById("selectEntidades");
    componenteSelect.addEventListener("change", () => {
        filtro = filtrarPor(entidades);
        crearCheckBoxs(checkboxes);
        crearTabla(checkboxes, filtro);
    });
});

