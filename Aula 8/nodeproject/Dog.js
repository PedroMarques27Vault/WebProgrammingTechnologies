"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Dog = void 0;
var Canine_1 = require("./Canine");
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(hab, race, name, bark) {
        var _this = _super.call(this, hab, race) || this;
        Dog.nDogs++;
        _this.name = name;
        _this.bark = bark;
        return _this;
    }
    Dog.prototype.show = function () {
        console.log("There Are " + Dog.nDogs + " Dogs\n" +
            " This One:\n Name=" + this.name + ";\n Family=" + this.race + ";\n Habitat= " + this.habitat);
    };
    Dog.prototype.talk = function () {
        console.log(this.bark);
    };
    Dog.nDogs = 0;
    return Dog;
}(Canine_1.Canine));
exports.Dog = Dog;
