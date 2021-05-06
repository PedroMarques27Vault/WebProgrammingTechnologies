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
exports.Cat = void 0;
var Feline_1 = require("./Feline");
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(hab, family, name, meow) {
        var _this = _super.call(this, hab, family) || this;
        Cat.nCats++;
        _this.name = name;
        _this.meow = meow;
        return _this;
    }
    Cat.prototype.show = function () {
        console.log("There Are " + Cat.nCats + " Cats\n" +
            " This One: \n Name=" + this.name + ";\n Family=" + this.family + ";\n Habitat= " + this.habitat);
    };
    Cat.prototype.talk = function () {
        console.log(this.meow);
    };
    Cat.nCats = 0;
    return Cat;
}(Feline_1.Feline));
exports.Cat = Cat;
