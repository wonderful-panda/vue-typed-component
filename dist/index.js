"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Vue = require("vue");
var vue_class_component_1 = require("vue-class-component");
/*
 * Base class for typesafe component
 */
var TypedComponent = (function (_super) {
    __extends(TypedComponent, _super);
    function TypedComponent() {
        return _super.apply(this, arguments) || this;
    }
    return TypedComponent;
}(Vue));
TypedComponent = __decorate([
    vue_class_component_1.default({
        beforeCreate: function () {
            this.$props = this;
        }
    })
], TypedComponent);
exports.TypedComponent = TypedComponent;
var EvTypedComponent = (function (_super) {
    __extends(EvTypedComponent, _super);
    function EvTypedComponent() {
        return _super.apply(this, arguments) || this;
    }
    return EvTypedComponent;
}(Vue));
EvTypedComponent = __decorate([
    vue_class_component_1.default({
        beforeCreate: function () {
            this.$props = this;
            this.$events = {
                emit: this.$emit.bind(this),
                on: this.$on.bind(this),
                once: this.$once.bind(this),
                off: this.$off.bind(this)
            };
        }
    })
], EvTypedComponent);
exports.EvTypedComponent = EvTypedComponent;
/*
 * Base class for typesafe component with $data
 */
var StatefulTypedComponent = (function (_super) {
    __extends(StatefulTypedComponent, _super);
    function StatefulTypedComponent() {
        return _super.apply(this, arguments) || this;
    }
    return StatefulTypedComponent;
}(TypedComponent));
exports.StatefulTypedComponent = StatefulTypedComponent;
var StatefulEvTypedComponent = (function (_super) {
    __extends(StatefulEvTypedComponent, _super);
    function StatefulEvTypedComponent() {
        return _super.apply(this, arguments) || this;
    }
    return StatefulEvTypedComponent;
}(EvTypedComponent));
exports.StatefulEvTypedComponent = StatefulEvTypedComponent;
/*
 * decorator with typesafe interface
 */
exports.component = vue_class_component_1.default;
