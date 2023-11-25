document.addEventListener('DOMContentLoaded', function () {
    const characterTable = document.getElementById('characterTable');
    const characterDetail = document.getElementById('characterDetail');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    let currentPage = 1;

    // Función para obtener personajes de la API
    function getCharacters(page) {
        fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => response.json())
            .then(data => {
                populateTable(data.results);
            })
            .catch(error => console.error('Error fetching characters:', error));
    }

    // Función para cambiar de página
    function changePage(direction) {
        if (direction === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (direction === 'next') {
            currentPage++;
        }

        // Obtén personajes de la nueva página y actualiza la tabla
        getCharacters(currentPage);
    }

    // Agrega un evento de clic al botón de anterior
    prevPageButton.addEventListener('click', () => changePage('prev'));

    // Agrega un evento de clic al botón de siguiente
    nextPageButton.addEventListener('click', () => changePage('next'));

    // Obtén los primeros personajes al cargar la página
    getCharacters(currentPage);



    function populateTable(characters) {
        const tbody = characterTable.querySelector('tbody');
        tbody.innerHTML = ''; // Limpiar contenido anterior

        characters.forEach(character => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', character.id);
            row.innerHTML = `
                <td>${character.name}</td>
                <td>${character.status}</td>
                <td>${character.species}</td>
            `;
            tbody.appendChild(row);

            // Agrega un evento de clic a cada fila
            row.addEventListener('click', () => {
                const characterId = row.getAttribute('data-id');
                // Fetch y muestra detalles del personaje al hacer clic
                fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
                    .then(response => response.json())
                    .then(character => displayCharacterDetail(character));
            });
        });
    }

    function displayCharacterDetail(character) {
        characterDetail.innerHTML = `
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
            <p>Location: ${character.location.name}</p>
            <img src="${character.image}" alt="${character.name}">
        `;
    
        // Mostrar el detalle del personaje
        characterDetail.style.display = 'block';
    }
});
