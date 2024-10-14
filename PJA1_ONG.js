// Emmagatzemament d'animals i persones en arrays
const animals = [
    { id: 1, nom: "Lucas", descripcio: "Un gos gran i amigable.", imatge: "./IMG/pexels-pixabay-247937.jpg" },
    { id: 2, nom: "Mariano", descripcio: "Un gat juganer i afectuós.", imatge: "./IMG/Gato4.jpg" },
    { id: 3, nom: "Filemon", descripcio: "Un ocell que canta molt bé.", imatge: "./IMG/Pajaro1.jpg" },
    { id: 4, nom: "Juanjo", descripcio: "Un que canta molt bé.", imatge: "./IMG/Pajaro1.jpg" }
];

const fosterPeople = [
    { id: 1, nom: "Anna", animals: [animals[0]] }, // Rex asignado a Anna
    { id: 2, nom: "Marc", animals: [animals[1]] },  // Mittens asignado a Marc
    { id: 3, nom: "Laura", animals: [animals[2]] }   // Tweety asignado a Laura
];

// Funció per mostrar animals disponibles amb la persona assignada
function displayAnimals() {
    let animalsList = document.getElementById('animals-list');
    animalsList.innerHTML = ''; // Esborra la llista anterior
    
    animals.forEach(animal => {
        // Buscar la persona a la qual està assignat aquest animal
        let assignedPerson = fosterPeople.find(person => person.animals.includes(animal));
        let personName = assignedPerson ? assignedPerson.nom : "Sense assignar"; // Comprova si té una persona assignada

        // Crear la carta de l'animal
        let animalCard = document.createElement('div');
        animalCard.className = 'card'; // Assignem la classe 'card' per a estilitzar
        animalCard.innerHTML = `
            <h3>${animal.nom}</h3>
            <img src="${animal.imatge}" alt="${animal.nom}">
            <p>${animal.descripcio}</p>
            <p><strong>Adoptado/a por:</strong> ${personName}</p>
        `;
        animalsList.appendChild(animalCard);
    });

    // Omplir el select d'animals
    let animalSelect = document.getElementById('animal-select');
    animalSelect.innerHTML = ''; // Esborra el selector anterior
    animals.forEach(animal => {
        let option = document.createElement('option');
        option.value = animal.id;
        option.textContent = animal.nom;
        animalSelect.appendChild(option);
    });
}

// Inicialització
displayAnimals();



function fillAnimalSelect() {
    let animalSelect = document.getElementById('animal-select');
    animals.forEach(animal => {
        let option = document.createElement('option');
        option.value = animal.nom;
        option.textContent = animal.nom;
        animalSelect.appendChild(option);
    });
}

// Funció per gestionar l'enviament del formulari amb validació de Bootstrap
document.getElementById('adoption-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validació personalitzada de Bootstrap
    let form = document.getElementById('adoption-form');
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
    } else {
        // Si tot és correcte, mostrar el missatge d'èxit
        document.getElementById('success-message').style.display = 'block';
        form.reset(); // Netejar el formulari després de l'enviament
        form.classList.remove('was-validated'); // Resetejar la validació
    }
});

// Inicialització
fillAnimalSelect();
