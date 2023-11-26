// api.js

async function getCharacters(page) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}
