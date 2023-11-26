/**
 * Obtiene un conjunto de personajes de la API de Rick and Morty.
 *
 * @param {number} - El número de página que se va a recuperar.
 * @returns {Promise} Una promesa que se resuelve con los datos de la página solicitada.
 * @throws {Error} Si hay un error al realizar la solicitud HTTP o si la respuesta no es exitosa.
 */

async function getCharacters(page) {
    try {
        // Realiza una solicitud a la API
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parsea la respuesta como JSON y devuelve los datos
        const data = await response.json();
        return data;
    } catch (error) {
        // Captura cualquier error durante la solicitud o el procesamiento de la respuesta
        console.error('Error fetching characters:', error);
        throw error;
    }
}