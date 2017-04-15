/**
 * Created by User on 14.04.2017.
 */

function getData() {
    var path = "data.json";
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // 2. Конфигурируем его: GET-запрос на URL 'Xmarine.json'
    xhr.open('GET', path);// путь к тому или иному json
    // 3. Отсылаем запрос
    xhr.send();
    xhr.onload = function () {
        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            // обработать ошибку
        } else {
            var data = JSON.parse(xhr.responseText);
            //window.data = {};
            // window.data[title] = data[title]; // определены оба объекта 'Black_parody', 'Xmarine'
            //console.log('window[key]=>', window[key]);
            // save pages
            console.log("данные в теле функции: ", data);
            return data;
        }
    };
    xhr.onerror = function (event) {
        console.log(event);
    };
}

var getAccessToData = (function () {
    var data = {};
    return {
        retreiveValue: function (title) {
            return data[title];
        },
        addData: function (title) {
            data = getData(title);
            console.log("data вне функции = ", data);
        }
    }
}());