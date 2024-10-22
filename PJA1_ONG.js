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

// Función para mostrar animales no adoptados
function displayAnimals() {
    let animalsList = document.getElementById('animals-list');
    animalsList.innerHTML = '';  // Limpiar la lista anterior

    animals.forEach(animal => { // Función en flecha
        let animalCard = document.createElement('div');
        animalCard.className = 'card';
        animalCard.id = `animal-card-${animal.id}`;

        let adoptionInfo = '';  // Información de adopción
        if (animal.adoptado) {
            adoptionInfo = `<p><strong>Adoptado/a por:</strong> ${animal.cliente}</p>`;
        }
        animalCard.innerHTML = `
            <p>¡Hola soy ${animal.nom}!<p>
            <img src="${animal.imatge}" alt="${animal.nom}">
            <p>${animal.descripcio}</p>
            <button class="btn btn-primary" onclick="showAdoptionPopup(${animal.id})" ${animal.adoptado ? 'disabled' : ''}>${animal.adoptado ? 'Adoptado' : 'Adoptar'}</button>
            ${adoptionInfo}
        `;
        
        animalsList.appendChild(animalCard);  // Añadir la tarjeta del animal
    });
}


// Mostrar popup de adopción
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
            <button class="btn btn-primary" disabled>Adoptado</button>
        `;

        cerrarPopup();
    } else {
        alert("Por favor, selecciona una persona para adoptar.");
    }
}

// Función para cerrar el popup
function cerrarPopup() {
    document.getElementById('adoption-popup').style.display = 'none';  // Ocultar el popup
}

// Verificar en qué página estamos y cargar los animales correspondientes
if (window.location.pathname.includes('PJA1_ONGADOPTADOS.html')) {
    displayAdoptedAnimals();  // Mostrar los animales adoptados
} else if (window.location.pathname.includes('PJA1_ONGADOPCION.html')) {
    displayAnimals();  // Mostrar los animales no adoptados
}

// Añadir eventos a los botones
document.getElementById('adopt-btn').addEventListener('click', adoptaAnimal);
document.getElementById('close-popup-btn').addEventListener('click', cerrarPopup);
