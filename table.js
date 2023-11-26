// table.js

// Añade esta función para obtener los detalles de un personaje
function getCharacterDetails(characterId, displayCharacterDetail) {
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(character => {
            displayCharacterDetail(character);
        })
        .catch(error => {
            console.error('Error fetching character details:', error);
            throw error;
        });
}

// Mantén el resto del código igual
function populateTable(characterTable, characters, displayCharacterDetail) {
    const tbody = characterTable.querySelector('tbody');
    tbody.innerHTML = '';

    characters.forEach(character => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', character.id);
        row.innerHTML = `
            <td>${character.id}</td>
            <td>${character.name}</td>
            <td>${character.status}</td>
            <td>${character.species}</td>
        `;
        tbody.appendChild(row);

        row.addEventListener('click', () => {
            const characterId = row.getAttribute('data-id');
            getCharacterDetails(characterId, displayCharacterDetail);
        });
    });

    
}
