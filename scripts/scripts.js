/**
 * Created by User on 05.04.2017.
 */
// В этом случае аргумент makeAdder 1-й в строке, аргумент getName - 2-й.
function makeAdder(a){
    return function getResult(b){
        return a+b; // a - аргумент makeAdder, b - аргумент getName
    }
}

var getName=makeAdder("Cynthia ");
console.log("Name: ", getName("Philips"));