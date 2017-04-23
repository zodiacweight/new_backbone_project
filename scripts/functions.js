/**
 * Created by User on 14.04.2017.
 */
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

function getTemplate(fileWay) {
    var defer = $.Deferred();
    $.get(fileWay, function (template_file) { // все содержимое файла по данному запросу в одну строку
        // преобразует строку в html-элемент
        var tmplHTML = $.parseHTML(template_file), // все содержимое тегов script в файле
            tmplContents = $(tmplHTML).html();
        console.log('Got data=>', {tmplHTML:tmplHTML, tmplContents:tmplContents});
        defer.resolve(tmplContents);
    });
    return defer.promise();
    /*var promise = new Promise(function(resolve, reject){
        var tmplHTML = $.parseHTML(fileWay), // все содержимое тегов script в файле
            tmplContents = $(tmplHTML).html();
            console.log("fileWay: ", {fileWay:fileWay, tmplHTML:tmplHTML, tmplContents:tmplContents});
		var cnt=0, int = setInterval(function(){
		    cnt++;
            console.log("tmplHTML: ", tmplHTML, "tmplContents: ", tmplContents);
            // распарсить содержимое шаблона и вписать в переменную.
    		if((tmplHTML)&&(tmplContents)){
    		    resolve(result);
    		    clearInterval(int);
    		}
    	    else {
    	        if(cnt > 15){
    	             reject('not it');
    	             clearInterval(int);
    	        }
    	       
    	    }
		}, 100) 
	});
	return promise;*/
}

var getAccessToData = (function () {
    var data; //= {};
    return {
        retreiveValue: function (key) {
            return ! data ? false : data[key];
        },
        addData: function (title) {
            //
            getData(title).then(
                function (result) {
                    if (!data) data = {};
                    //console.log("data вне функции = ", result);
                    data[title]=result;
                },
                function (message) {
                }
            );
        },
        addTemplate: function (temp, callback) {
            //data[temp]="string";
            getTemplate("templates/" + temp + ".html").then(
                function (result) {
                    if (!data) data = {};
                    console.log("шаблон: ", result);
                    callback(result, data);
                    // data[temp] = result;
                    // console.log("data[temp]: ", data[temp]);
                },
                function (message) {
                    console.log(message);
                }  
            ); /**/
        }
    }
} ());


/*Схема того, что получается при загрузке view:
* Обращение к data, извлечение данных по title. Если их там нет, добавляем.
* Обращение к data, извлечение шаблона по view. Если его там нет, добавляем.
* Из данных и шаблона, извлекаемых из data, делаем view и вставляем его в область
* контента.
* */