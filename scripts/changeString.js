var ChangingString = (
    function(){
        var string = "My characters: ";
        // функция, которая изменяет значение
        function changeBy(addElement){
            string=string+addElement;
        }
        return {
            // closures: функции, которые вызывают функцию, изменяющую значение, с аргументом, на
// который следует изменить значение
            addCharacter1: function(){
                changeBy("Frederika ");
            },
            addCharacter2: function(){
                changeBy("Rickward ");
            },
            value: function(){
                return string;
            }
        }
    }

)();

/*var string1 = changingString.value(),
ChangingString.addCharacter1();
var Frederika=changingString.value(); */
var e1 = ChangingString.value();
ChangingString.addCharacter2();
ChangingString.addCharacter1();
console.log("New string: ", ChangingString.value());
var e2 = ChangingString.value();
console.log("e1: ", e1, "e2: ", e2);