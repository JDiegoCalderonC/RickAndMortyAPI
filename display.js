// ui.js

function displayCharacterDetail(characterDetail, character) {
    characterDetail.innerHTML = `
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Gender: ${character.gender}</p>
        <p>Origin: ${character.origin.name}</p>
        <p>Location: ${character.location.name}</p>
        <img src="${character.image}" alt="${character.name}">
    `;

    characterDetail.style.display = 'block';
}
