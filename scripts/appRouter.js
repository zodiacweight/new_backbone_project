var dataModel = Backbone.Model.extend(
    {
        initialize: function (title) {
            this.promisedData = this.assureData(title);
        },
        // will save promise
        /**
         * "Xmarine", prime_block
         * @param key
         * @param prime_block
         */
        assureData: function (title) {
            var _this = this,
                defer = $.Deferred();
            getDataPromise(title);  // Получает данные из json (асинхронно) и сохраняет в window[key]
            checkJsonData(title).then( // Проверка наличия этих данных, затем /-
                function (data_object) { // данная функция - это defer.resolve, вызываемая в теле checkJsonData
                    _this.set('data', data_object);
                    defer.resolve(_this.get('data'));
                },
                function (mes) {
                    console.log(mes);
                }
            );
            return defer.promise();
        }
    }
);

var AppRouter = Backbone.Router.extend({
    routes:  {
        "": "initView",
        ":title/:view": "loadView"
    },
    initView: function() {

    },
    loadView: function(title, view){
        if (!(getAccessToData.retreiveValue(title))) {
            //getAccessToData.addData(title); // Вызов метода, который возвращает json-данные в виде promise.
           // tryingToGetData=getAccessToData.retreiveValue(title);
            //console.log("tryingToGetData: ", tryingToGetData);
        }
    }
    /* В функции для загрузки view:
    * Получить шаблон и данные.
    * Заполнить шаблон данными в зависимости от частей url и сохранить этот view в переменную.
    * Вставить эту переменную в область контента.
    * */
});
var appRouter = new AppRouter();
Backbone.history.start();