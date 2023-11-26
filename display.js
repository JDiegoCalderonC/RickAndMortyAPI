/**
 * Muestra los detalles de un personaje en un contenedor específico del DOM.
 *
 * @param {HTMLElement} - El contenedor donde se mostrarán los detalles del personaje.
 * @param {Object} - La información del personaje que se va a mostrar.
 */

function displayCharacterDetail(characterDetail, character) {

    // Extraer números finales de las URLs de los episodios
    const episodeNumbers = character.episode.map(url => url.split('/').pop());

    // Convertir la fecha de creación del personaje a un formato legible
    const createdDate = new Date(character.created);
    const formattedCreatedDate = formatDate(createdDate);

    // Verificar si el personaje tiene un valor en la propiedad "type"
    const typeHTML = character.type ? `<p><strong>Type:</strong> ${character.type}</p>` : '';

    // Construir la estructura HTML para mostrar los detalles del personaje
    characterDetail.innerHTML = `
        <div class="character-card">
            <h2>${character.name} (ID: ${character.id})</h2>
            <img src="${character.image}" alt="${character.name}">
            <div class="character-info">
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
                ${typeHTML}
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Origin:</strong> ${character.origin.name}</p>
                <p><strong>Location:</strong> ${character.location.name}</p>
                <p><strong>Episode(s):</strong> ${episodeNumbers.join(', ')}</p>
                <p><strong>Created:</strong> ${formattedCreatedDate}</p>
                <p><strong>URL:</strong> ${character.url}</p>
            </div>
        </div>
    `;

    // Mostrar el contenedor de detalles del personaje
    characterDetail.style.display = 'block';
}



/**
 * Cambia el formato de la fecha en un formato legible.
 *
 * @param {Date} date - Objeto Date que representa la fecha a formatear.
 * @returns {string} La fecha formateada en un formato legible.
 */

function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}
