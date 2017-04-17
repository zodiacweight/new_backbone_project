/**
 * Created by User on 14.04.2017.
 */

function getData(title) {
        var promise = new Promise(function(resolve, reject){
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
                var cnt=0, int = setInterval(function(){
                    var data = JSON.parse(xhr.responseText);
                    //window.data = {};
                    // window.data[title] = data[title]; // определены оба объекта 'Black_parody', 'Xmarine'
                    //console.log('window[key]=>', window[key]);
                    // save pages
                    cnt++;
                    if(data[title]){
                        resolve(data[title]);
                        console.log("данные в теле функции: ", data);
                        clearInterval(int);
                    }
                    else {
                        if(cnt>15){
                            reject("Данные не получены");
                            clearInterval(int);
                        }
                        
                    }  
                }, 100);
            }
        };
        xhr.onerror = function (event) {
            console.log(event);
        };
    });
    return promise; // функция должна возвращать promise.
}


var getAccessToData = (function () {
    var data = {};
    return {
        retreiveValue: function (title) {
            return data[title];
        },
        addData: function (title) {
            getData(title).then(
                function(result){
                    console.log("data вне функции = ", result);
                },
                function (message){
                    console.log(message);
                }
            );
        }
    }
}());

/*
 *
 *
 * */