
// Espera a que el contenido del documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', async function () {

    // Obtiene referencias a elementos del DOM
    const characterTable = document.getElementById('characterTable');
    const characterDetail = document.getElementById('characterDetail');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // Inicializa variables de paginación y caché de detalles de personajes
    let currentPage = 1;
    let characterDetailsCache = {}; // Almacena los detalles del personaje por ID

    
    // Agrega un evento al botón de búsqueda para buscar personajes por ID.
    searchButton.addEventListener('click', () => searchCharacterById());
    
    
    // Agrega un evento al input de búsqueda.
    searchInput.addEventListener('input', () => {
        const inputValue = searchInput.value.trim();

        if (isNaN(inputValue)) {
            // Muestra un mensaje de error si el valor no es un número
            alert('Solo se permiten números');
            // Limpia los detalles si el campo de búsqueda no es un número
            characterDetail.innerHTML = '';
            characterDetail.style.display = 'none';
            // Limpia el campo de búsqueda
            searchInput.value = '';
        }
    });

    
    // Agrega eventos a los botones de paginación para cambiar de página.
    prevPageButton.addEventListener('click', () => changePage('prev'));
    nextPageButton.addEventListener('click', () => changePage('next'));

    try {
        // Obtiene datos de personajes para la página actual y los muestra en la tabla
        const data = await getCharacters(currentPage);
        populateTable(characterTable, data.results, character => {
            displayCharacterDetail(characterDetail, character);
        });
        // Actualiza la información de paginación
        updatePagination(data.info);
    } catch (error) {
        // Maneja errores durante la obtención de datos de personajes
        console.error('Error:', error);
    }



    /**
     * Función para cambiar de página (anterior o siguiente).
     * @param {string} - Dirección de la página ('prev' para anterior, 'next' para siguiente).
     */

    function changePage(direction) {
        if (direction === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (direction === 'next') {
            currentPage++;
        }

        // Obtiene datos de personajes para la nueva página y actualiza la tabla y la paginación
        getCharacters(currentPage).then(data => {
            populateTable(characterTable, data.results, character => {
                displayCharacterDetail(characterDetail, character);
            });
            updatePagination(data.info);
        });
    }


    /**
     * Función para actualizar la información de paginación en el DOM.
     * @param {object} - Información de paginación.
     */
    
    function updatePagination(info) {
        currentPageSpan.textContent = `${currentPage} `;
        totalPagesSpan.textContent = `/ ${info.pages}`;
    }

    
    // Función para buscar detalles de un personaje por ID.
    function searchCharacterById() {
        const characterId = parseInt(searchInput.value);

        if (!isNaN(characterId)) {
            if (characterDetailsCache[characterId]) {
                // Si los detalles del personaje ya están en caché, mostrarlos directamente
                displayCharacterDetail(characterDetail, characterDetailsCache[characterId]);
            } else {
                // Si los detalles no están en caché, obtenerlos y mostrarlos
                getCharacterDetails(characterId, character => {
                    // Almacenar los detalles del personaje en caché
                    characterDetailsCache[characterId] = character;

                    // Limpiar el campo de búsqueda
                    searchInput.value = '';

                    // Mostrar los detalles del personaje
                    displayCharacterDetail(characterDetail, character);
                });
            }
        }
    }
});
