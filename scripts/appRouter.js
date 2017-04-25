  /**var dataModel = Backbone.Model.extend({
    initialize: function(title) {
        this.promisedData = this.assureData(title);
    },
    // will save promise
  
     * "Xmarine", prime_block
     * @param key
     * @param prime_block
    
    assureData: function(title) {
        var _this = this,
            defer = $.Deferred();
        getDataPromise(title); // Получает данные из json (асинхронно) и сохраняет в window[key]
        checkJsonData(title).then( // Проверка наличия этих данных, затем /-
            function(data_object) { // данная функция - это defer.resolve, вызываемая в теле checkJsonData
                _this.set('data', data_object);
                defer.resolve(_this.get('data'));
            },
            function(mes) {
                console.log(mes);
            }
        );
        return defer.promise();
    }
});  */

var AppRouter = Backbone.Router.extend({
    routes: {
        "": "initView",
        ":title/:view": "loadView"
    },
    initView: function() {

    },
    loadView: function(title, view) {
            console.log("функция loadView вызвана!");
            var temp = "temp"+view[view.length-1];
            // if returns false or null or ''
            if (!getAccessToData.retreiveValue(title)) {
                getAccessToData.addField("jsons/"+title+".json", function(result, data){
                    data[title] = result;
                    console.log('%cCheck addData =>', 'background: lime', {
                        result:result, data:data
                    });
                }); 
                // Вызов метода, который возвращает json-данные в виде promise.
                // tryingToGetData=getAccessToData.retreiveValue(title);
                //
            }
            if(!getAccessToData.retreiveValue(temp)){
                getAccessToData.addField("templates/"+temp+".html", function(result, data){
                    data[temp] = result;
                    console.log('%cCheck addData =>', 'background: lime', {
                        result:result, temp:temp
                    });
                });
            }
            console.log("data: ", getAccessToData.retreiveValue(title), "templ:", 
            getAccessToData.retreiveValue(temp));
        }
        /* Взять данные и шаблон из getAccessToData;
        * Сделать из них готовый view и вставить в область контента;
        * Получить шаблон верхнего меню, заполнить его данными в зависимости от
        * title и вставить в нужное место.
         * */
});
var appRouter = new AppRouter();
Backbone.history.start();
