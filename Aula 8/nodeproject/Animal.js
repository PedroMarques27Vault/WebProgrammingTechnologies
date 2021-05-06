"use strict";
exports.__esModule = true;
exports.Animal = void 0;
var Animal = /** @class */ (function () {
    function Animal(hab) {
        Animal.nAnimals++;
        this.habitat = hab;
    }
    Animal.prototype.show = function () {
        console.log(this.habitat);
    };
    Animal.nAnimals = 0;
    return Animal;
}());
exports.Animal = Animal;
