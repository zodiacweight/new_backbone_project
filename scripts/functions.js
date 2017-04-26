/**
 * Created by User on 14.04.2017.

function getData(title) {
    var promise = new Promise(function (resolve, reject) {
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
                var cnt = 0, int = setInterval(function () {
                    var data = JSON.parse(xhr.responseText);
                    cnt++;
                    if (data[title]) {
                        resolve(data[title]);
                        //console.log("данные в теле функции: ", data);
                        clearInterval(int);
                    }
                    else {
                        if (cnt > 15) {
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
  */
function getFile(fileWay) {
    var defer = $.Deferred();
    $.get(fileWay, function (template_file) { // все содержимое файла по данному запросу в одну строку
        // преобразует строку в html-элемент
        var tmplHTML = $.parseHTML(template_file), // все содержимое тегов script в файле
            tmplContents = $(tmplHTML).html();
        //console.log('Got data=>', {tmplHTML:tmplHTML, tmplContents:tmplContents});
        defer.resolve(tmplContents);
    });
    return defer.promise();
}

var getAccessToData = (function () {
    var data;
    return {
        retreiveValue: function (key) {
            if (!data) return false; 
            else return key ? data[key] : data;
        },
        initData: function(){
            if (!data) data = {};
        },
        addData: function (title) {
            //
            getFile(title).then(
                function (result) {
                    if (!data) data = {};
                    //console.log("data вне функции = ", result);
                    data[title]=result;
                },
                function (message) {
                }
            );
        },  /**/
        addField: function (fileWay, callback) {
            //data[temp]="string";
            //console.log("fileWay", fileWay);
            getFile(fileWay).then(
                function (result) {
                    if (!data) data = {};
                    //console.log("шаблон: ", result);
                    callback(result, data);
                    // data[temp] = result;
                    // console.log("data[temp]: ", data[temp]);
                },
                function (message) {
                    console.log(message);
                }  
            ); /**/
        },
        makeView: function (title, tmpl){
            if(data===undefined){
                var count=0;
                while(data!=={}){
                    count++;
                    if(count>1238000){
                        break;
                    }
                }
                console.log("data: ");
            }
            else {
                
            }
            //console.log("data[title]: ", data[title], "data[templ]:", data[templ]);
            /*if((data[title])&&(data[tmpl])){
                var readyView = _.template(data[title], tmpl);
                return readyView;
            }
            else {
                var c=0;
                while((data[title]===undefined)&&(data[tmpl]===undefined)){
                    
                }
            } */
        }
    }
} ());


/*Схема того, что получается при загрузке view:
* Обращение к data, извлечение данных по title. Если их там нет, добавляем.
* Обращение к data, извлечение шаблона по view. Если его там нет, добавляем.
* Из данных и шаблона, извлекаемых из data, делаем view и вставляем его в область
* контента.
* */