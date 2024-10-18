// Emmagatzemament d'animals i persones en arrays
const animals = [
    { id: 1, nom: "Lucas", descripcio: "", imatge: "./IMG/perroadoptado1.jpg" },
    { id: 2, nom: "Mariano", descripcio: "", imatge: "./IMG/Gato4.jpg" },
    { id: 3, nom: "Filemon", descripcio: "", imatge: "./IMG/Pajaro1.jpg" },
    { id: 4, nom: "Angular", descripcio: "", imatge: "./IMG/conejo1.jpg" },
    { id: 5, nom: "Antonio", descripcio: "", imatge: "./IMG/gatoadoptado2.jpg" },
    { id: 6, nom: "Messi", descripcio: "", imatge: "./IMG/conejo2.jpg" },
    { id: 7, nom: "Titan", descripcio: "", imatge: "./IMG/periquito1.jpg" },
    { id: 8, nom: "Shakira", descripcio: "", imatge: "./IMG/Gato5.jpg" },
    { id: 9, nom: "Pikachu", descripcio: "", imatge: "./IMG/perro2.jpg" },
    { id: 10, nom: "Miguel", descripcio: "", imatge: "./IMG/Gato6.jpg" }
];

const fosterPeople = [
    { id: 1, nom: "Anna", animals: [animals[0]] }, 
    { id: 2, nom: "Marc", animals: [animals[1]] }, 
    { id: 3, nom: "Joan", animals: [animals[2]] },   
    { id: 4, nom: "Jie Li", animals: [animals[3]] },  
    { id: 5, nom: "Francisco", animals: [animals[4]] },   
    { id: 6, nom: "Laura", animals: [animals[5]] },   
    { id: 7, nom: "Carla", animals: [animals[6]] },   
    { id: 8, nom: "Sofía", animals: [animals[7]] },  
    { id: 9, nom: "Alberto", animals: [animals[8]] },   
    { id: 10, nom: "Sebastián", animals: [animals[9]] }  
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
            <p>¡Hola soy ${animal.nom}!<p>
            <img src="${animal.imatge}" alt="${animal.nom}">
            <p>${animal.descripcio}</p>
            <p><strong>Adoptado/a por:</strong> <br> ${personName}</p>
            <button type="button" >Adoptar</button>
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
