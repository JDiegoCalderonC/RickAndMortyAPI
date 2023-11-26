document.addEventListener('DOMContentLoaded', async function () {
    const characterTable = document.getElementById('characterTable');
    const characterDetail = document.getElementById('characterDetail');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    let currentPage = 1;
    let characterDetailsCache = {}; // Almacena los detalles del personaje por ID

    searchButton.addEventListener('click', () => searchCharacterById());
    searchInput.addEventListener('input', () => {
        if (!searchInput.value.trim()) {
            // Limpiar los detalles si el campo de búsqueda está vacío
            characterDetail.innerHTML = '';
            characterDetail.style.display = 'none';
        }
    });

    prevPageButton.addEventListener('click', () => changePage('prev'));
    nextPageButton.addEventListener('click', () => changePage('next'));

    try {
        const data = await getCharacters(currentPage);
        populateTable(characterTable, data.results, character => {
            displayCharacterDetail(characterDetail, character);
        });
        updatePagination(data.info);
    } catch (error) {
        console.error('Error:', error);
    }

    function changePage(direction) {
        if (direction === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (direction === 'next') {
            currentPage++;
        }

        getCharacters(currentPage).then(data => {
            populateTable(characterTable, data.results, character => {
                displayCharacterDetail(characterDetail, character);
            });
            updatePagination(data.info);
        });
    }

    function updatePagination(info) {
        currentPageSpan.textContent = `${currentPage} `;
        totalPagesSpan.textContent = `/ ${info.pages}`;
    }

    function searchCharacterById() {
        const characterId = parseInt(searchInput.value);

        if (!isNaN(characterId)) {
            if (characterDetailsCache[characterId]) {
                // Si los detalles del personaje ya están en caché, mostrarlos directamente
                displayCharacterDetail(characterDetail, characterDetailsCache[characterId]);
            } else {
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
