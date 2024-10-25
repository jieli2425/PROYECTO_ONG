/**
 * @file Este archivo contiene funciones para gestionar la adopción de animales y muestra una interfaz para la selección de animales y personas.
 * @version 1.0.0
 * @license MIT
 */

/**
 * @typedef {Object} Animal
 * @property {number} id - Identificación del animal
 * @property {string} nom - Nombre del animal
 * @property {string} descripcio - Descripción del animal
 * @property {string} imatge - Ruta de la imagen del animal
 * @property {boolean} adoptado - Estado de adopción del animal
 * @property {string} cliente - Nombre del cliente que adopta al animal
 */

/**
 * @typedef {Object} Persona
 * @property {number} id - Identificación de la persona
 * @property {string} nom - Nombre de la persona
 * @property {Animal[]} animals - Lista de animales adoptados por la persona
 */

/** @type {Animal[]} */
let animals = [
    { id: 1, nom: "Lucas", descripcio: "Un perro amigable", imatge: "./IMG/perroadoptado1.jpg", adoptado: false, cliente: "" },
    { id: 2, nom: "Mariano", descripcio: "Gato juguetón", imatge: "./IMG/Gato4.jpg", adoptado: false, cliente: "" },
    { id: 3, nom: "Filemon", descripcio: "Un pájaro curioso", imatge: "./IMG/Pajaro1.jpg", adoptado: false, cliente: "" },
    { id: 4, nom: "Angular", descripcio: "Conejo saltarín", imatge: "./IMG/conejo1.jpg", adoptado: false, cliente: "" },
    { id: 5, nom: "Antonio", descripcio: "Gato travieso", imatge: "./IMG/gatoadoptado2.jpg", adoptado: false, cliente: "" },
    { id: 6, nom: "Messi", descripcio: "Conejo veloz", imatge: "./IMG/conejo2.jpg", adoptado: false, cliente: "" },
    { id: 7, nom: "Titan", descripcio: "Gato Peludo", imatge: "./IMG/Gato6.jpg", adoptado: false, cliente: "" },
    { id: 8, nom: "Shakira", descripcio: "Periquito travieso", imatge: "./IMG/periquito1.jpg", adoptado: false, cliente: "" },
    { id: 9, nom: "Pikachu", descripcio: "Perro adorable", imatge: "./IMG/perro2.jpg", adoptado: false, cliente: "" },
    { id: 10, nom: "Miguel", descripcio: "Gato chupón", imatge: "./IMG/Gato5.jpg", adoptado: false, cliente: "" }
];


/** @type {Persona[]} */
const personas = [
    { id: 1, nom: "Anna", animals: [] },
    { id: 2, nom: "Marc", animals: [] },
    { id: 3, nom: "Joan", animals: [] },
    { id: 4, nom: "Jie Li", animals: [] },
    { id: 5, nom: "Francisco", animals: [] },
    { id: 6, nom: "Laura", animals: [] },
    { id: 7, nom: "Carla", animals: [] },
    { id: 8, nom: "Sofía", animals: [] },
    { id: 9, nom: "Alberto", animals: [] },
    { id: 10, nom: "Sebastián", animals: [] }
];
/**
 * La función displayAnimals muestra una lista de animales enseñando si estan adoptados o no.
 */

function displayAnimals() {
    let animalsList = document.getElementById('animals-list');
    animalsList.innerHTML = ''; 

    for (let i = 0; i < animals.length; i++) {
        let animal = animals[i];  


        let animalCard = document.createElement('div');
        animalCard.className = 'card';
        animalCard.id = `animal-card-${animal.id}`;

        let adopcionInfo = '';  
        let cancelarButton = '';  
        let adoptButton = '';  

        if (animal.adoptado) {
            adopcionInfo = `<p><strong>Adoptado/a por:</strong> ${animal.cliente}</p>`;
            cancelarButton = `<button class="btn btn-secondary" onclick="cancelarAdopcion(${animal.id})">Cancelación</button>`;
            adoptButton = `<button class="btn btn-primary" disabled>Adoptado</button>`;
        } else {
            adoptButton = `<button class="btn btn-primary" onclick="showAdoptionPopup(${animal.id})">Adoptar</button>`;
        }

        animalCard.innerHTML = `
                <p>¡Hola soy ${animal.nom}!<p>
                <img src="${animal.imatge}" alt="${animal.nom}">
                <p>${animal.descripcio}</p>
                ${adoptButton}
                ${adopcionInfo}
                ${cancelarButton}
            `;

        animalsList.appendChild(animalCard);  
    }
}
/**
 * Esta función cancela la adopción volviendo el estado de adoptado de animal a false, para volver a poder ser adoptado
 * @param {number} animalId 
 */

function cancelarAdopcion(animalId) {
    for (let i = 0; i < animals.length; i++) {
        let animal = animals[i];

        if (animal.id === animalId) {  
            animal.adoptado = false;
            animal.cliente = '';

            let animalCard = document.getElementById(`animal-card-${animal.id}`);
            animalCard.innerHTML = `
                <p>¡Hola soy ${animal.nom}!<p>
                <img src="${animal.imatge}" alt="${animal.nom}">
                <p>${animal.descripcio}</p>
                <button class="btn btn-primary" onclick="showAdoptionPopup(${animal.id})">Adoptar</button>
            `;

            alert(`La adopción de ${animal.nom} ha sido cancelada.`);
            break;
        }
    }
}
/**
 * Esta función muestra un pop up con la lista de personas a seleccionar para adooptar a un animal.
 * @param {number} animalId 
 */

function showAdoptionPopup(animalId) {
    let popup = document.getElementById('adoption-popup');
    popup.style.display = 'block';  
    document.getElementById('animal-id').value = animalId;
    document.getElementById('persona-select').innerHTML = '';  

    for (let i = 0; i < personas.length; i++) {
        let persona = personas[i];
        let option = document.createElement('option');
        option.value = persona.id;
        option.textContent = persona.nom;
        document.getElementById('persona-select').appendChild(option);  
    }
}

/**
 * La función adoptaAnimal registra la adopción del animal después de seleccionar a la persona en el pop up
 */
function adoptaAnimal() {
    let animalId = parseInt(document.getElementById('animal-id').value);  
    let personaId = parseInt(document.getElementById('persona-select').value);   

    let animal = null;
    let persona = null;

    for (let i = 0; i < animals.length; i++) {
        if (animals[i].id === animalId) {
            animal = animals[i];
            break;  
        }
    }

    for (let i = 0; i < personas.length; i++) {
        if (personas[i].id === personaId) {
            persona = personas[i];
            break;  
        }
    }

    if (animal && persona) {
        persona.animals.push(animal);  
        animal.adoptado = true;
        animal.cliente = persona.nom; 

        let animalCard = document.getElementById(`animal-card-${animal.id}`);
        animalCard.innerHTML = `
            <p>¡Hola soy ${animal.nom}!<p>
            <img src="${animal.imatge}" alt="${animal.nom}">
            <p>${animal.descripcio}</p>
            <p><strong>Adoptado/a por:</strong> ${persona.nom}</p>
            <button class="btn btn-primary" id="boton-btn" disabled>Adoptado</button>
            <button class="btn btn-secondary" onclick="cancelarAdopcion(${animal.id})">Cancelación</button>
        `;

        cerrarPopup();

        alert(`¡Felicidades! Has adoptado a ${animal.nom} con éxito.`);
    } else {
        alert("Por favor, selecciona una persona para adoptar.");
    }
}

/**
 * Función para cerrar el popup
 */
function cerrarPopup() {
    document.getElementById('adoption-popup').style.display = 'none';  
}

/**
 * El window.onload se ha usado para que a la hora de iniciar o refrescar la página, se muestre todos los animales no adoptados
 */
window.onload = function () {
    displayAnimals("noAdoptados");  
}


document.getElementById('adopt-btn').addEventListener('click', adoptaAnimal);
document.getElementById('close-popup-btn').addEventListener('click', cerrarPopup);
