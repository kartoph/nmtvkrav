let data = [];
let filteredData = [];
let currentPage = 1;
let rowsPerPage = 5;

// Завантаження JSON-даних
fetch('js/innovation-list.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        filteredData = [...data];
        renderTable();
    })
    .catch(error => console.error('Помилка завантаження JSON:', error));

// Рендеринг таблиці
function renderTable() {
    const tableBody = document.querySelector('#titles-table tbody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredData.slice(start, end);

    pageData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${item.title || '—'}</td>
            <td>${item.category || '—'}</td>
            <td>${item.organization || '—'}</td>
            <td><button>${item.category || 'Деталі'}</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Сортування
document.querySelectorAll('#titles-table th[data-sort]').forEach(header => {
    header.addEventListener('click', () => {
        const sortKey = header.getAttribute('data-sort');
        filteredData.sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return -1;
            if (a[sortKey] > b[sortKey]) return 1;
            return 0;
        });
        renderTable();
    });
});

// Зміна кількості рядків на сторінку
document.querySelector('#rows-per-page').addEventListener('change', event => {
    rowsPerPage = parseInt(event.target.value, 10);
    currentPage = 1;
    renderTable();
});

// Пошук за назвою
document.querySelector('#search-title').addEventListener('input', event => {
    const searchTerm = event.target.value.toLowerCase();
    filteredData = data.filter(item => item.title && item.title.toLowerCase().includes(searchTerm));
    currentPage = 1;
    renderTable();
});