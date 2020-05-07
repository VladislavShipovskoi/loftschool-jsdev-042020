/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    homeworkContainer.style.height = '100vh';

    let div = document.createElement('div');

    div.classList.add('draggable-div');

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    function getRandomValue(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    function getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    const elementWidth = getRandomValue(0, windowWidth);
    const elementHeight = getRandomValue(0, windowHeight);

    div.style.width = `${elementWidth}px`;
    div.style.height = `${elementHeight}px`;

    div.style.background = getRandomColor();

    div.style.position = 'absolute';

    let availSpaceV = windowHeight - elementHeight;
    let availSpaceH = windowWidth - elementWidth;

    div.style.top = `${Math.round(Math.random() * availSpaceV)}px`;
    div.style.left = `${Math.round(Math.random() * availSpaceH)}px`;

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    let initialLeft, initialTop, dragStartX, dragStartY, currentElement;

    target.addEventListener('mousedown', function (e) {
        e.preventDefault();
        currentElement = e.target;
        initialLeft = parseInt(currentElement.style.left);
        initialTop = parseInt(currentElement.style.top);
        dragStartX = e.clientX;
        dragStartY = e.clientY;
    });

    target.addEventListener('mousemove', function (e) {
        if (currentElement) {
            currentElement.style.left = `${initialLeft - (dragStartX - e.clientX)}px`;
            currentElement.style.top = `${initialTop - (dragStartY - e.clientY)}px`;
        }
    });

    target.addEventListener('mouseup', function () {
        currentElement = null;
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };
