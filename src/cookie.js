/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function getCookies() {
    let cookies = {};

    if (document.cookie) {
        document.cookie.split(';').map((item) => {
            const [name, value] = item.split('=');

            cookies[name.trim()] = value;
        });

        return cookies;
    }

    return undefined;
}

function addCookie(name, value) {
    document.cookie = name + '=' + value;
}

function delCookie(name) {
    document.cookie = name + '=;max-age=-1';
}

function updateTable(filter) {
    let cookies = getCookies();

    filter = filterNameInput.value;
    listTable.innerHTML = '';
    for (let cookie in cookies) {
        if (!filter || cookie.indexOf(filter) !== -1 || cookies[cookie].indexOf(filter) !== -1) {
            let row = listTable.insertRow(-1);
            let button = document.createElement('button');

            button.textContent = 'удалить';
            button.addEventListener('click', (event) => {
                const cookieName = event.target.parentNode.parentNode.firstChild.textContent;

                delCookie(cookieName);
                updateTable();
            });

            row.insertCell(0).textContent = cookie;
            row.insertCell(1).textContent = cookies[cookie];
            row.insertCell(2).appendChild(button);
        }
    }
}

filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    updateTable();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    addCookie(addNameInput.value, addValueInput.value);
    updateTable();
});

document.addEventListener('DOMContentLoaded', () => {
    updateTable();
});
