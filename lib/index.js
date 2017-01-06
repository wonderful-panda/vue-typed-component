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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5QkFBMkI7QUFDM0IsMkRBQTZDO0FBNkM3QyxnQ0FBZ0M7QUFNaEMsSUFBYSxjQUFjO0lBQWdCLGtDQUFHO0lBQTlDOztJQUVBLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFGRCxDQUEyQyxHQUFHLEdBRTdDO0FBRlksY0FBYztJQUwxQiw2QkFBVSxDQUFzQjtRQUM3QixZQUFZO1lBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztLQUNKLENBQUM7R0FDVyxjQUFjLENBRTFCO0FBRlksd0NBQWM7QUFJM0IsMkNBQTJDO0FBWTNDLElBQWEsZ0JBQWdCO0lBQXdCLG9DQUFHO0lBQXhEOztJQUdBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFIRCxDQUFxRCxHQUFHLEdBR3ZEO0FBSFksZ0JBQWdCO0lBWDVCLDZCQUFVLENBQTZCO1FBQ3BDLFlBQVk7WUFDUixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHO2dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0dBQ1csZ0JBQWdCLENBRzVCO0FBSFksNENBQWdCO0FBSzdCLHlDQUF5QztBQUN6QztJQUFrRSwwQ0FBcUI7SUFBdkY7O0lBR0EsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQUhELENBQWtFLGNBQWMsR0FHL0U7QUFIcUIsd0RBQXNCO0FBSzVDLGlEQUFpRDtBQUNqRDtJQUE0RSw0Q0FBK0I7SUFBM0c7O0lBR0EsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FBQyxBQUhELENBQTRFLGdCQUFnQixHQUczRjtBQUhxQiw0REFBd0I7QUFhakMsUUFBQSxTQUFTLEdBQXVCLDZCQUFVLENBQUM7QUFHeEQ7O0dBRUc7QUFDSCw2QkFDb0IsSUFBWSxFQUNaLEtBQTZCLEVBQzdCLE1BQXdDO0lBQ3hELE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2QsVUFBVSxFQUFFLElBQUk7UUFDaEIsSUFBSSxNQUFBO1FBQ0osS0FBSyxFQUFFLEtBQVk7UUFDbkIsTUFBTSxRQUFBO0tBQ1QsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELGtEQVVDIn0=