(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("vue-class-component"));
	else if(typeof define === 'function' && define.amd)
		define(["vue", "vue-class-component"], factory);
	else if(typeof exports === 'object')
		exports["vue-typed-component"] = factory(require("vue"), require("vue-class-component"));
	else
		root["vue-typed-component"] = factory(root["vue"], root["vue-class-component"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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
	var Vue = __webpack_require__(1);
	var vue_class_component_1 = __webpack_require__(2);
	var po = __webpack_require__(3);
	// for component which has props
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
	// for component which has props and events
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
	// for component which has props and data
	var StatefulTypedComponent = (function (_super) {
	    __extends(StatefulTypedComponent, _super);
	    function StatefulTypedComponent() {
	        return _super.apply(this, arguments) || this;
	    }
	    return StatefulTypedComponent;
	}(TypedComponent));
	exports.StatefulTypedComponent = StatefulTypedComponent;
	// for component which has props, events and data
	var StatefulEvTypedComponent = (function (_super) {
	    __extends(StatefulEvTypedComponent, _super);
	    function StatefulEvTypedComponent() {
	        return _super.apply(this, arguments) || this;
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
	var PropOptions;
	(function (PropOptions) {
	    PropOptions.Str = po.Str;
	    PropOptions.Num = po.Num;
	    PropOptions.Bool = po.Bool;
	    PropOptions.Func = po.Func;
	    PropOptions.Obj = po.Obj;
	    PropOptions.Arr = po.Arr;
	    PropOptions.Any = po.Any;
	    PropOptions.ofType = po.ofType;
	})(PropOptions = exports.PropOptions || (exports.PropOptions = {}));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var __assign = (this && this.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	function createPropOptionBuilder(type, createValidators) {
	    function createPartial(base) {
	        return Object.assign({
	            Validator: function (validator) { return (__assign({}, base, { validator: validator })); }
	        }, base, createValidators(base));
	    }
	    return Object.assign({
	        Required: createPartial({ type: type, required: true }),
	        Default: function (value) { return createPartial({ type: type, default: value }); }
	    }, createPartial({ type: type }));
	}
	exports.Str = createPropOptionBuilder(String, function (base) {
	    var $ = function (validator) { return (__assign({}, base, { validator: validator })); };
	    return {
	        $in: function () {
	            var values = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                values[_i] = arguments[_i];
	            }
	            return $(function (v) { return values.indexOf(v) >= 0; });
	        },
	        $match: function (pattern) { return $(function (v) { return pattern.test(v); }); }
	    };
	});
	exports.Num = createPropOptionBuilder(Number, function (base) {
	    var $ = function (validator) { return (__assign({}, base, { validator: validator })); };
	    return {
	        $lessThan: function (max) { return $(function (v) { return v < max; }); },
	        $greaterThan: function (min) { return $(function (v) { return min < v; }); },
	        $lessEqual: function (max) { return $(function (v) { return v <= max; }); },
	        $greaterEqual: function (min) { return $(function (v) { return min <= v; }); },
	        $between: function (min, max) { return $(function (v) { return min <= v && v <= max; }); },
	        $nonZero: function () { return $(function (v) { return v !== 0; }); },
	        $positive: function () { return $(function (v) { return v > 0; }); },
	        $nonNegative: function () { return $(function (v) { return v >= 0; }); },
	    };
	});
	exports.Arr = createPropOptionBuilder(Array, function (base) {
	    var $ = function (validator) { return (__assign({}, base, { validator: validator })); };
	    return {
	        $maxLength: function (max) { return $(function (v) { return v.length <= max; }); },
	        $notEmpty: function () { return $(function (v) { return v.length > 0; }); },
	        $all: function (test) { return $(function (v) {
	            for (var i = 0; i < v.length; ++i) {
	                if (!test(v[i])) {
	                    return false;
	                }
	            }
	            return true;
	        }); }
	    };
	});
	exports.Bool = createPropOptionBuilder(Boolean, function (base) { return undefined; });
	exports.Func = createPropOptionBuilder(Function, function (base) { return undefined; });
	exports.Obj = createPropOptionBuilder(Object, function (base) { return undefined; });
	exports.Any = createPropOptionBuilder(null, function (base) { return undefined; });
	function ofType(type) {
	    return createPropOptionBuilder(type, function (base) { return undefined; });
	}
	exports.ofType = ofType;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map