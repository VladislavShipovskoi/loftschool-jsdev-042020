/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray[i] = fn(array[i], i, array);
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var accumulator = initial === undefined ? array[0] : initial;

    let i = initial === undefined ? 1 : 0;

    for (i; i < array.length; i++) {
        accumulator = fn(accumulator, array[i], i, array);
    }

    return accumulator;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let upperPropsArray = [];

    for (let i = 0; i < Object.keys(obj).length; i++) {
        upperPropsArray.push(Object.keys(obj)[i].toUpperCase());
    }

    return upperPropsArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let result = [];

    if (to < 0) {
        to = array.length - Math.abs(to);
    } else if (Math.abs(to) > array.length) {
        to = array.length;
    }

    if (from > array.length) {
        return [];
    } else if (Math.abs(from) > array.length) {
        from = 0;
    }

    for (let i = from; i < to; i++) {
        result.push(array[i]);
    }

    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    const handler = {
        set(target, prop, val) {
            let result = false;

            if (typeof val == 'number') {
                target[prop] = val * val;
                result = true;
            }

            return result;
        },
    };

    return new Proxy(obj, handler);
}

export { forEach, map, reduce, upperProps, slice, createProxy };
