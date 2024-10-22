//Arrays de los animales
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

//Array de las personas
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

// Mostrar animales que podemos adoptar o los que ya están adoptados
function displayAnimals(filter = "noAdoptados") {  // 'filter' para elegir entre no adoptados o adoptados
    let animalsList = document.getElementById('animals-list');
    animalsList.innerHTML = '';  // Limpiar la lista anterior

    animals.forEach(animal => { // Función en flecha
        if ((filter === "adoptados" && animal.adoptado) || (filter === "noAdoptados" && !animal.adoptado)) {
            let animalCard = document.createElement('div');
            animalCard.className = 'card';
            animalCard.id = `animal-card-${animal.id}`;

            let adopcionInfo = '';  // Información de adopción
            let cancelarButton = '';  // Botón de cancelar adopción
            let adoptButton = '';  // Botón de adoptar

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

            animalsList.appendChild(animalCard);  // Añadir la tarjeta del animal
        }
    });
}

// Función para cancelar la adopción
function cancelarAdopcion(animalId) {
    let animal = animals.find(animal => animal.id === animalId);
    
    if (animal) {
        // Revertir la adopción
        animal.adoptado = false;
        animal.cliente = '';

        // Actualizar la tarjeta del animal
        let animalCard = document.getElementById(`animal-card-${animal.id}`);
        animalCard.innerHTML = `
            <p>¡Hola soy ${animal.nom}!<p>
            <img src="${animal.imatge}" alt="${animal.nom}">
            <p>${animal.descripcio}</p>
            <button class="btn btn-primary" onclick="showAdoptionPopup(${animal.id})">Adoptar</button>
        `;

        alert(`La adopción de ${animal.nom} ha sido cancelada.`);
    }
}

function showAdoptionPopup(animalId) {
    let popup = document.getElementById('adoption-popup');
    popup.style.display = 'block';  // Mostrar el popup
    document.getElementById('animal-id').value = animalId;
    document.getElementById('persona-select').innerHTML = '';  // Limpiar opciones anteriores

    personas.forEach(persona => {
        let option = document.createElement('option');
        option.value = persona.id;
        option.textContent = persona.nom;
        document.getElementById('persona-select').appendChild(option);  // Añadir opción de persona
    });
}

// Adoptar un animal
function adoptaAnimal() {
    let animalId = parseInt(document.getElementById('animal-id').value);  // Obtener ID del animal
    let personaId = parseInt(document.getElementById('persona-select').value);  // Obtener ID de la persona

    let animal = animals.find(animal => animal.id === animalId);
    let persona = personas.find(persona => persona.id === personaId);

    if (animal && persona) {
        persona.animals.push(animal);  // Añadir animal a la lista de la persona
        animal.adoptado = true;
        animal.cliente = persona.nom;  // Asignar el nombre del cliente

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

// Función para cerrar el popup
function cerrarPopup() {
    document.getElementById('adoption-popup').style.display = 'none';  // Ocultar el popup
}

// Función que asigna el filtro a los botones
function setFilter(filter) {
    displayAnimals(filter);
}

// Cargar los animales no adoptados por defecto al iniciar
window.onload = function() {
    displayAnimals("noAdoptados");  // Mostrar los animales no adoptados al iniciar la página
}

// Añadir eventos a los botones
document.getElementById('adopt-btn').addEventListener('click', adoptaAnimal);
document.getElementById('close-popup-btn').addEventListener('click', cerrarPopup);

