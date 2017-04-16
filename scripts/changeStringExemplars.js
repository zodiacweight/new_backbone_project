var changingString = function(){
    var string = "Terrific heroes: ";
    function changeBy(addHero){
        string+=addHero;
    }
    return {
        addHero1: function(){
            changeBy("Superman ");
        },
        addHero2: function(){
            changeBy("Supergirl ");
        },
        addHero3: function (){
            changeBy("Spiderman ");
        },
        value: function () {
            return string;
        }
    }
}

var Exemplar1 = changingString(), Exemplar2 = changingString();

Exemplar1.addHero1();
Exemplar1.addHero2();
Exemplar1.addHero3();

console.log("Ex1: ", Exemplar1.value(), " Ex2: ", Exemplar2.value());