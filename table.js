/**
 * Obtiene los detalles de un personaje mediante su ID y los muestra.
 *
 * @param {number} - El ID del personaje que se va a obtener.
 * @param {function} - La función utilizada para mostrar los detalles del personaje.
 * @throws {Error} Si hay un error al obtener los detalles del personaje.
 */


async function getCharacterDetails(characterId, displayCharacterDetail) {
    try {
        // Realiza una solicitud a la API para obtener detalles del personaje
        const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);

        // Verifica si la respuesta es exitosa (código de estado 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convierte la respuesta a formato JSON
        const character = await response.json();

        // Llama a la función de visualización de detalles del personaje
        displayCharacterDetail(character);
    } catch (error) {
        // Maneja errores en la obtención de detalles del personaje
        console.error('Error fetching character details:', error);
        throw error;
    }
}




/**
 * Llena una tabla HTML con datos de personajes y agrega un evento de clic para mostrar detalles del personaje.
 *
 * @param {HTMLElement} - La tabla HTML a poblar con datos de personajes.
 * @param {Array}  - La lista de personajes para mostrar en la tabla.
 * @param {function} - La función utilizada para mostrar los detalles del personaje al hacer clic en una fila.
 */


function populateTable(characterTable, characters, displayCharacterDetail) {
    // Obtiene el cuerpo de la tabla
    const tbody = characterTable.querySelector('tbody');
    
    // Limpia el contenido actual del cuerpo de la tabla
    tbody.innerHTML = '';

    // Itera sobre la lista de personajes y crea filas en la tabla
    characters.forEach(character => {
        // Crea una nueva fila
        const row = document.createElement('tr');
        
        // Establece el atributo 'data-id' con el ID del personaje
        row.setAttribute('data-id', character.id);
        
        // Rellena las celdas de la fila con información del personaje
        row.innerHTML = `
            <td>${character.id}</td>
            <td>${character.name}</td>
            <td>${character.status}</td>
            <td>${character.species}</td>
        `;
        
        // Agrega la fila al cuerpo de la tabla
        tbody.appendChild(row);

        // Agrega un evento click a la fila para mostrar detalles del personaje
        row.addEventListener('click', async () => {
            // Obtiene el ID del personaje desde el atributo 'data-id'
            const characterId = row.getAttribute('data-id');
            
            try {
                // Llama a la función para obtener y mostrar detalles del personaje
                await getCharacterDetails(characterId, displayCharacterDetail);
            } catch (error) {
                // Maneja errores
                console.error('Error fetching character details:', error);
                throw error;
            }
        });
    });
}
