// display.js

function displayCharacterDetail(characterDetail, character) {

    // Extraer números finales de las URLs de los episodios
    const episodeNumbers = character.episode.map(url => url.split('/').pop());

    const createdDate = new Date(character.created);
    const formattedCreatedDate = formatDate(createdDate);

    characterDetail.innerHTML = `
        <div class="character-card">
            <h2>${character.name} (ID: ${character.id})</h2>
            <img src="${character.image}" alt="${character.name}">
            <div class="character-info">
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Type:</strong> ${character.type}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Origin:</strong> ${character.origin.name}</p>
                <p><strong>Location:</strong> ${character.location.name}</p>
                <p><strong>Episode(s):</strong> ${episodeNumbers.join(', ')}</p>
                <p><strong>Created:</strong> ${formattedCreatedDate}</p>
                <p><strong>URL:</strong> ${character.url}</p>
            </div>
        </div>
    `;

    characterDetail.style.display = 'block';
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}
