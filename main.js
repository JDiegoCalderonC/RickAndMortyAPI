document.addEventListener('DOMContentLoaded', function () {
    const characterTable = document.getElementById('characterTable');
    const characterDetail = document.getElementById('characterDetail');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    let currentPage = 1;

    prevPageButton.addEventListener('click', () => changePage('prev'));
    nextPageButton.addEventListener('click', () => changePage('next'));

    getCharacters(currentPage).then(data => {
        populateTable(characterTable, data.results, character => {
            displayCharacterDetail(characterDetail, character);
        });-
        updatePagination(data.info); // Agregamos esta línea para actualizar la información de paginación
    });

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
            updatePagination(data.info); // Actualizamos la información de paginación
        });
    }

    function updatePagination(info) {
        currentPageSpan.textContent = `${currentPage}`;
        totalPagesSpan.textContent = ` / ${info.pages}`;
    }
});
