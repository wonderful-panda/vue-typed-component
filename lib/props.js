"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJvcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQWdCQSxpQ0FBaUQsSUFBYyxFQUFFLGdCQUE4QztJQUMzRyx1QkFBdUIsSUFBcUI7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDakIsU0FBUyxFQUFFLFVBQUMsU0FBdUIsSUFBSyxPQUFBLENBQUEsYUFBc0IsSUFBSSxJQUFFLFNBQVMsV0FBQSxHQUFFLENBQUEsRUFBdkMsQ0FBdUM7U0FDbEYsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDakIsUUFBUSxFQUFFLGFBQWEsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNqRCxPQUFPLFlBQUMsS0FBZSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0UsRUFBRSxhQUFhLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBT1ksUUFBQSxHQUFHLEdBQUcsdUJBQXVCLENBQTRDLE1BQU0sRUFBRSxVQUFBLElBQUk7SUFDOUYsSUFBTSxDQUFDLEdBQUcsVUFBQyxTQUE0QixJQUFLLE9BQUEsY0FBTSxJQUFJLElBQUUsU0FBUyxXQUFBLElBQUcsRUFBeEIsQ0FBd0IsQ0FBQztJQUNyRSxNQUFNLENBQUM7UUFDSCxHQUFHLEVBQUU7WUFBQyxnQkFBUztpQkFBVCxVQUFTLEVBQVQscUJBQVMsRUFBVCxJQUFTO2dCQUFULDJCQUFTOztZQUFLLE9BQUEsQ0FBQyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFB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