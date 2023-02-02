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
exports.Canine = void 0;
var Mammal_1 = require("./Mammal");
var Canine = /** @class */ (function (_super) {
    __extends(Canine, _super);
    function Canine(hab, race) {
        var _this = _super.call(this, hab) || this;
        Canine.nCanines++;
        _this.race = race;
        return _this;
    }
    Canine.prototype.show = function () {
        console.log("There Are " + Canine.nCanines + " Felines" +
            " This One: Race=" + this.race + ";\n Habitat= " + this.habitat);
    };
    Canine.nCanines = 0;
    return Canine;
}(Mammal_1.Mammal));
exports.Canine = Canine;
