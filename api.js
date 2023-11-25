// api.js

function getCharacters(page) {
    return fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data; // Devuelve los datos obtenidos de la respuesta JSON
        })
        .catch(error => {
            console.error('Error fetching characters:', error);
            throw error; // Rechaza la promesa con el error original
        });
}
