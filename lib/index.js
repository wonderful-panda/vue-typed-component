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
    vue_class_component_1.default({
        beforeCreate: function () {
            this.$props = this;
        }
    })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUJBQTJCO0FBQzNCLDJEQUE2QztBQTZDN0MsZ0NBQWdDO0FBTWhDLElBQWEsY0FBYztJQUFnQixrQ0FBRztJQUE5Qzs7SUFFQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBMkMsR0FBRyxHQUU3QztBQUZZLGNBQWM7SUFMMUIsNkJBQVUsQ0FBc0I7UUFDN0IsWUFBWTtZQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7S0FDSixDQUFDO0dBQ1csY0FBYyxDQUUxQjtBQUZZLHdDQUFjO0FBSTNCLDJDQUEyQztBQVkzQyxJQUFhLGdCQUFnQjtJQUF3QixvQ0FBRztJQUF4RDs7SUFHQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBSEQsQ0FBcUQsR0FBRyxHQUd2RDtBQUhZLGdCQUFnQjtJQVg1Qiw2QkFBVSxDQUE2QjtRQUNwQyxZQUFZO1lBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRztnQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMzQixFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMzQixHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzVCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztHQUNXLGdCQUFnQixDQUc1QjtBQUhZLDRDQUFnQjtBQUs3Qix5Q0FBeUM7QUFDekM7SUFBa0UsMENBQXFCO0lBQXZGOztJQUdBLENBQUM7SUFBRCw2QkFBQztBQUFELENBQUMsQUFIRCxDQUFrRSxjQUFjLEdBRy9FO0FBSHFCLHdEQUFzQjtBQUs1QyxpREFBaUQ7QUFDakQ7SUFBNEUsNENBQStCO0lBQTNHOztJQUdBLENBQUM7SUFBRCwrQkFBQztBQUFELENBQUMsQUFIRCxDQUE0RSxnQkFBZ0IsR0FHM0Y7QUFIcUIsNERBQXdCO0FBYWpDLFFBQUEsU0FBUyxHQUF1Qiw2QkFBVSxDQUFDO0FBR3hEOztHQUVHO0FBQ0gsNkJBQ29CLElBQVksRUFDWixLQUE2QixFQUM3QixNQUF3QztJQUN4RCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNkLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLElBQUksTUFBQTtRQUNKLEtBQUssRUFBRSxLQUFZO1FBQ25CLE1BQU0sUUFBQTtLQUNULENBQUMsQ0FBQztBQUNQLENBQUM7QUFWRCxrREFVQyJ9