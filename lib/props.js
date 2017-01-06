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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJvcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBZ0JBLGlDQUFpRCxJQUFjLEVBQUUsZ0JBQThDO0lBQzNHLHVCQUF1QixJQUFxQjtRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNqQixTQUFTLEVBQUUsVUFBQyxTQUF1QixJQUFLLE9BQUEsQ0FBQSxhQUFzQixJQUFJLElBQUUsU0FBUyxXQUFBLEdBQUUsQ0FBQSxFQUF2QyxDQUF1QztTQUNsRixFQUFFLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNqQixRQUFRLEVBQUUsYUFBYSxDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2pELE9BQU8sWUFBQyxLQUFlLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMvRSxFQUFFLGFBQWEsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFPWSxRQUFBLEdBQUcsR0FBRyx1QkFBdUIsQ0FBNEMsTUFBTSxFQUFFLFVBQUEsSUFBSTtJQUM5RixJQUFNLENBQUMsR0FBRyxVQUFDLFNBQTRCLElBQUssT0FBQSxjQUFNLElBQUksSUFBRSxTQUFTLFdBQUEsSUFBRyxFQUF4QixDQUF3QixDQUFDO0lBQ3JFLE1BQU0sQ0FBQztRQUNILEdBQUcsRUFBRTtZQUFDLGdCQUFTO2lCQUFULFVBQVMsRUFBVCxxQkFBUyxFQUFULElBQVM7Z0JBQVQsMkJBQVM7O1lBQUssT0FBQSxDQUFDLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFN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