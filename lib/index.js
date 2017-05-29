"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require("vue");
var vue_class_component_1 = require("vue-class-component");
// for component which has props
var TypedComponent = (function (_super) {
    __extends(TypedComponent, _super);
    function TypedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TypedComponent;
}(Vue));
TypedComponent = __decorate([
    vue_class_component_1.default({})
], TypedComponent);
exports.TypedComponent = TypedComponent;
// for component which has props and events
var EvTypedComponent = (function (_super) {
    __extends(EvTypedComponent, _super);
    function EvTypedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EvTypedComponent;
}(Vue));
EvTypedComponent = __decorate([
    vue_class_component_1.default({
        beforeCreate: function () {
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
// for component which has props and data
var StatefulTypedComponent = (function (_super) {
    __extends(StatefulTypedComponent, _super);
    function StatefulTypedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StatefulTypedComponent;
}(TypedComponent));
exports.StatefulTypedComponent = StatefulTypedComponent;
// for component which has props, events and data
var StatefulEvTypedComponent = (function (_super) {
    __extends(StatefulEvTypedComponent, _super);
    function StatefulEvTypedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StatefulEvTypedComponent;
}(EvTypedComponent));
exports.StatefulEvTypedComponent = StatefulEvTypedComponent;
exports.component = vue_class_component_1.default;
/*
 * Typesafe helper to define functional component
 */
function functionalComponent(name, props, render) {
    return Vue.extend({
        functional: true,
        name: name,
        props: props,
        render: render
    });
}
exports.functionalComponent = functionalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUJBQTJCO0FBQzNCLDJEQUE2QztBQTZDN0MsZ0NBQWdDO0FBRWhDLElBQWEsY0FBYztJQUFnQixrQ0FBRztJQUE5Qzs7SUFFQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBMkMsR0FBRyxHQUU3QztBQUZZLGNBQWM7SUFEMUIsNkJBQVUsQ0FBc0IsRUFBRSxDQUFDO0dBQ3ZCLGNBQWMsQ0FFMUI7QUFGWSx3Q0FBYztBQUkzQiwyQ0FBMkM7QUFXM0MsSUFBYSxnQkFBZ0I7SUFBd0Isb0NBQUc7SUFBeEQ7O0lBR0EsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQUhELENBQXFELEdBQUcsR0FHdkQ7QUFIWSxnQkFBZ0I7SUFWNUIsNkJBQVUsQ0FBNkI7UUFDcEMsWUFBWTtZQUNSLElBQUksQ0FBQyxPQUFPLEdBQUc7Z0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDM0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDM0IsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM1QixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7R0FDVyxnQkFBZ0IsQ0FHNUI7QUFIWSw0Q0FBZ0I7QUFLN0IseUNBQXlDO0FBQ3pDO0lBQWtFLDBDQUFxQjtJQUF2Rjs7SUFHQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBSEQsQ0FBa0UsY0FBYyxHQUcvRTtBQUhxQix3REFBc0I7QUFLNUMsaURBQWlEO0FBQ2pEO0lBQTRFLDRDQUErQjtJQUEzRzs7SUFHQSxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQUFDLEFBSEQsQ0FBNEUsZ0JBQWdCLEdBRzNGO0FBSHFCLDREQUF3QjtBQWFqQyxRQUFBLFNBQVMsR0FBdUIsNkJBQVUsQ0FBQztBQUd4RDs7R0FFRztBQUNILDZCQUNvQixJQUFZLEVBQ1osS0FBNkIsRUFDN0IsTUFBd0M7SUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDZCxVQUFVLEVBQUUsSUFBSTtRQUNoQixJQUFJLE1BQUE7UUFDSixLQUFLLEVBQUUsS0FBWTtRQUNuQixNQUFNLFFBQUE7S0FDVCxDQUFDLENBQUM7QUFDUCxDQUFDO0FBVkQsa0RBVUMifQ==