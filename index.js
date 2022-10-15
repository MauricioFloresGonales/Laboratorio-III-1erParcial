//--------------------------------------------------------------------CONSTATES---------------------------------------------------------------------
const arrayDeDatos = [
    {"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterEgo":"Superman", "ciudad":"Metropolis","publicado":2002},
    {"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterEgo":"Batman", "ciudad":"Gotica","publicado":20012},
    {"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterEgo":"Flash", "ciudad":"Central","publicado":2017},
    {"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},
    {"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},
    {"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}
];

const checkboxes = [
    {"title": "ID", "name": "entidadId", "value": "id"},
    {"title": "Nombre", "name": "entidadNombre", "value": "nombre"},
    {"title": "Apellido", "name": "entidadApellido", "value": "apellido"},
    {"title": "Edad", "name": "entidadEdad", "value": "edad"},
    {"title": "AlterEgo", "name": "entidadAlterEgo", "value": "alterEgo"},
    {"title": "Ciudad", "name": "entidadCiudad", "value": "ciudad"},
    {"title": "Publicado", "name": "entidadPublicado", "value": "publicado"},
    {"title": "Enemigo", "name": "entidadEnemigo", "value": "enemigo"},
    {"title": "Robos", "name": "entidadRobos", "value": "robos"},
    {"title": "Asesinatos", "name": "entidadAsesinatos", "value": "asesinatos"}
];
//--------------------------------------------------------------------ENTIDADES---------------------------------------------------------------------
class Persona {
    constructor(id, nombre, apllido, edad) {
        this.id = id !== null ? id : 0;
        this.nombre = nombre != null ? nombre : " ";
        this.apllido = apllido != null ? apllido : " ";
        this.edad = edad  != null ? edad : 0;
    }
}

class Heroe extends Persona {
    constructor(id, nombre, apllido, edad, alterEgo, ciudad, publicado) {
        super(id, nombre, apllido, edad);
        this.alterEgo = alterEgo != null ? alterEgo : " ";
        this.ciudad = ciudad != null ? ciudad : " ";
        this.publicado = publicado > 1949 ? ciudad : 1949;
      }
}

class Villano extends Persona {
    constructor(id, nombre, apllido, edad, enemigo, robos, asesinatos) {
        super(id, nombre, apllido, edad);
        this.enemigo = enemigo != null ? enemigo : " ";
        this.robos = robos > 0 ? robos : 0;
        this.asesinatos = asesinatos > 0 ? asesinatos : 0;
      }
}

//--------------------------------------------------------------------iNDEX.JS---------------------------------------------------------------------


const boton = (abmComponent, text, funcion) => {
    let button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", funcion);
    abmComponent.appendChild(button);
}

const tdContenido = (filaDe, text) => {
    let columnaDato = document.createElement("td");
    let textoColumna = document.createTextNode(text);
    columnaDato.appendChild(textoColumna);
    filaDe.appendChild(columnaDato);
}

const crearEntidad = (entidad) => {
    const {id, nombre, apellido, edad} = entidad;

    if (entidad.hasOwnProperty("alterEgo")) {
        return new Heroe(id,nombre, apellido, edad, entidad.alterEgo, entidad.ciudad, entidad.publicado);
    } else {
        return new Villano(id,nombre, apellido, edad, entidad.enemigo, entidad.robos, entidad.asesinatos);
    }
}

const generaArrayDeDatos = (arrayDatos) => arrayDatos.map(data => crearEntidad(data));

const crearCheckBoxs = (arrayDeChecks) => {
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

            checkbox.onclick = () => {
                console.log("llegiue");
                // style="display:none;"
                let dynamicTable = document.getElementById('tableDinamica');
                console.log(dynamicTable);
            };
        
            let container = document.getElementById('container');
            container.appendChild(checkbox);
            container.appendChild(label);
        });
    }
}

const crearTabla = (filters, datos) => {
    if (filters != null &&  datos != null) {
        let dynamicTable = document.getElementById('dynamicTable');
        
        //borrar hijos para tener solo una tabla vacia
        
        let tabla   = document.createElement("table");
        tabla.style = "width:100%";
        tabla.id = "tableDinamica";

        //<--Filas Titulos-->
        let fila = document.createElement("tr");
        filters.map(dato => {
            let columna = document.createElement("th");
            let textoColumna = document.createTextNode(dato.title);
            columna.appendChild(textoColumna);
            fila.appendChild(columna);
            tabla.appendChild(fila);
        });

        //<--Filas Datos-->
        // setAttributes / setear un un nuevo atributo para reconocer que tipo de persona es
        dynamicTable.appendChild(tabla);
        datos.map(dato => {
            let filaDato = document.createElement("tr");
            let props =  Object.values(dato);

            if (dato instanceof Heroe) {
                props.map( p => {
                    tdContenido(filaDato, p);
                });
            } else {
                props.map( p => {
                    tdContenido(filaDato, p);
                });
            }
            
            tabla.appendChild(filaDato);
        })

        //<--Boton-->
        let filaBoton = document.createElement("tr");
        boton(filaBoton, "Agregar", () => {console.log("Agregar");});
        tabla.appendChild(filaBoton);

        /*button.addEventListener("click", funcion);*/
    }
}
const abmPersona = (arrayDeChecks, abmComponent, mostrarSolo) => {
    if (arrayDeChecks != null) {
        let mostrar = arrayDeChecks.filter( item => mostrarSolo.includes(item.value));
        mostrar.map(prop => {
                let label = document.createElement('label');
                label.for = prop.name;
                label.innerHTML = `${prop.title}: `;
                
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
const tablaABM = (arrayDeChecks) => {
    if (arrayDeChecks != null) {
        let abmComponent = document.getElementById('abmComponent');
        
        let mostrarABMPersona = ["id", "nombre", "apellido", "edad"];
        abmPersona(arrayDeChecks, abmComponent, mostrarABMPersona);
        
        let labelSelect = document.createElement('label');
        labelSelect.for = "tipo";
        labelSelect.innerHTML = 'Tipo: ';

        let select = document.createElement('select');
        let optionFutbolista = document.createElement('option');
        let optionTodosProfesional = document.createElement('option');
        optionTodosProfesional.value = 'Heroe'
        optionTodosProfesional.textContent = 'Heroe';
        optionFutbolista.value = 'Villano'
        optionFutbolista.textContent = 'Villano';
        select.appendChild(optionTodosProfesional);
        select.appendChild(optionFutbolista);
                
        let saltoDeLinea = document.createElement('br');

        abmComponent.appendChild(labelSelect);
        abmComponent.appendChild(select);
        abmComponent.appendChild(saltoDeLinea);
        
        let mostrarABMEspeciales = ["alterEgo", "ciudad", "publicado", "enemigo", "robos", "asesinatos"];
        abmPropsEspeciales(arrayDeChecks, abmComponent, mostrarABMEspeciales);
        
        
        boton(abmComponent, "Alta", () => console.log('Presiono Alta'));
        boton(abmComponent, "Modificar", () => console.log('Presiono Modificar'));
        boton(abmComponent, "Eliminar", () => console.log('Presiono Eliminar'));
        boton(abmComponent, "Cancelar", () => console.log('Presiono Cancelar'));
    }
}
//--------------------------------------------------------------------Funciones---------------------------------------------------------------------

const calcularPromedio = () =>  {
    let arrayDeEdades = entidades.map(entidad => (entidad.edad));
    let acumulador = 0;
    let sumaDeEdades = arrayDeEdades.reduce(
        (valorPrevio, valorPresente) => valorPrevio + valorPresente,
        acumulador
    );
    let imputEdadPromedio = document.getElementById('imputEdadPromedio');

    imputEdadPromedio.value = sumaDeEdades / entidades.length;
}

// ingresar todo esto dentro de un "windows.onload javascript"
let entidades = generaArrayDeDatos(arrayDeDatos)
console.log(entidades);

document.addEventListener('DOMContentLoaded', crearCheckBoxs(checkboxes), false);
document.addEventListener('DOMContentLoaded', crearTabla(checkboxes, entidades), false);
document.addEventListener('DOMContentLoaded', tablaABM(checkboxes), false);


let botonCalcular = document.getElementById('botonCalcular');
botonCalcular?.addEventListener("click", calcularPromedio);


// filter utilizar fetElelementByTag y preguntar por la propiedad creada "hasAttribute"

 
//ver  elemento = e.traget  para saber en  que elemento estoy y asì poder sacar la propiedad y poder ordenar

/*
funtion (e) {
    elemento = e.traget
    elemento.attribute.value(id);
    ordenar(id);
}
 */

