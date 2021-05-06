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
exports.Feline = void 0;
var Mammal_1 = require("./Mammal");
var Feline = /** @class */ (function (_super) {
    __extends(Feline, _super);
    function Feline(hab, family) {
        var _this = _super.call(this, hab) || this;
        Feline.nFelines++;
        _this.family = family;
        return _this;
    }
    Feline.prototype.show = function () {
        console.log("There Are " + Feline.nFelines + " Felines" +
            " This One: Family=" + this.family + ";\n Habitat= " + this.habitat);
    };
    Feline.nFelines = 0;
    return Feline;
}(Mammal_1.Mammal));
exports.Feline = Feline;
