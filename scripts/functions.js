/**
 * Created by User on 14.04.2017.
 */
/* * */
function getData(title) {
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
            window.data = {};
            window.data[title] = data[title]; // определены оба объекта 'Black_parody', 'Xmarine'
            //console.log('window[key]=>', window[key]);
            // save pages
            console.log("trying: ", data[title]);
            return data[title];
        }
    };
    xhr.onerror = function (event) {
        console.log(event);
    };
}


function checkJsonData(title) {
    // key: supergirl или Black mamba.
    var defer = $.Deferred(),
        cnt = 0;
    // вызывается многократно
    var sttm = setInterval(function () {
        ++cnt;
        if (window.data[title]) {
            // this передан через .bind
            this.data = window.data[title]; // (xmarineModel | black_parodyModel).play_object
            defer.resolve(this.data);
            clearInterval(sttm);
        }
        if (cnt >= 60) {
            console.warn('Cannot get file');
            defer.reject("The content is not here yet.");
            clearInterval(sttm);
        }
    }.bind(this), 200);
    return defer.promise();
}

var getAccessToData = (function () {
    var data = {};
    /* var getData = function (title) {
     var path="data.json";
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
     window.data={};
     window.data[title] = data[title]; // определены оба объекта 'Black_parody', 'Xmarine'
     //console.log('window[key]=>', window[key]);
     // save pages
     return data[title];
     }
     };
     xhr.onerror = function (event) {
     console.log(event);
     };
     }; */
    return {
        getData: function (title) {
            return data[title];
        },
        addData: function (title) {
            data[title] = getData(title);
        }
    }
}());