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
        return __assign({ Validator: function (validator) { return (__assign({}, base, { validator: validator })); }, Validators: createValidators(base) }, base);
    }
    return __assign({}, createPartial({ type: type }), { Required: createPartial({ type: type, required: true }), Default: function (value) { return createPartial({ type: type, default: value }); } });
}
exports.Str = createPropOptionBuilder(String, function (base) {
    var $ = function (validator) { return (__assign({}, base, { validator: validator })); };
    return {
        in: function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            return $(function (v) { return values.indexOf(v) >= 0; });
        },
        match: function (pattern) { return $(function (v) { return pattern.test(v); }); }
    };
});
exports.Num = createPropOptionBuilder(Number, function (base) {
    var $ = function (validator) { return (__assign({}, base, { validator: validator })); };
    return {
        lessThan: function (max) { return $(function (v) { return v < max; }); },
        greaterThan: function (min) { return $(function (v) { return min < v; }); },
        lessEqual: function (max) { return $(function (v) { return v <= max; }); },
        greaterEqual: function (min) { return $(function (v) { return min <= v; }); },
        between: function (min, max) { return $(function (v) { return min <= v && v <= max; }); },
        nonZero: function () { return $(function (v) { return v !== 0; }); },
        positive: function () { return $(function (v) { return v > 0; }); },
        nonNegative: function () { return $(function (v) { return v >= 0; }); },
    };
});
exports.Arr = createPropOptionBuilder(Array, function (base) {
    var $ = function (validator) { return (__assign({}, base, { validator: validator })); };
    return {
        maxLength: function (max) { return $(function (v) { return v.length <= max; }); },
        notEmpty: function () { return $(function (v) { return v.length > 0; }); },
        all: function (test) { return $(function (v) {
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
