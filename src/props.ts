import Vue, { PropOptions } from "vue";
import { Prop } from "vue/types/options";
export type Constructor = new (...args: any[]) => any;

export type ObjectSupplier<T> = () => (T & object);
export type Default<T> = T | ObjectSupplier<T>;
export type Validator<T> = (value: T) => boolean;

export type PropOrValidator<T, V> = PropOptions & V & {
    Validator: (v: Validator<T>) => PropOptions
};

export type PropOptionBuilder<T, V> = PropOrValidator<T, V> & {
    Required: PropOrValidator<T, V>;
    Default(value: Default<T>): PropOrValidator<T, V>;
};

function createPropOptionBuilder<T, TDefault extends Default<T>, V>(type: Prop<T>, createValidators: (base: PropOptions<T>) => V): PropOptionBuilder<T, V> {
    function createPartial(base: PropOptions<T>): PropOrValidator<T, V> {
        return Object.assign({
            Validator: (validator: Validator<T>) => <PropOptions<T>>{ ...base, validator }
        }, base, createValidators(base));
    }
    return Object.assign({
        Required: createPartial({ type, required: true }),
        Default(value: TDefault) { return createPartial({ type, default: value }); }
    }, createPartial({ type }));
}

export interface StringValidators {
    $in(...values: string[]): PropOptions;
    $match(pattern: RegExp): PropOptions;
}

export const Str = createPropOptionBuilder<string, Default<string>, StringValidators>(String, base => {
    const $ = (validator: Validator<string>) => ({ ...base, validator });
    return {
        $in: (...values) => $(v => values.indexOf(v) >= 0),
        $match: pattern => $(v => pattern.test(v))
    };
});

export interface NumberValidators {
    $lessThan(max: number): PropOptions;
    $greaterThan(min: number): PropOptions;
    $lessEqual(max: number): PropOptions;
    $greaterEqual(min: number): PropOptions;
    $between(min: number, max: number): PropOptions;
    $nonZero(): PropOptions;
    $positive(): PropOptions;
    $nonNegative(): PropOptions;
}

export const Num = createPropOptionBuilder<number, Default<number>, NumberValidators>(Number, base => {
    const $ = (validator: Validator<number>) => ({ ...base, validator });

    return {
        $lessThan: (max) => $(v => v < max),
        $greaterThan: (min) => $(v => min < v),
        $lessEqual: (max) => $(v => v <= max),
        $greaterEqual: (min) => $(v => min <= v),
        $between: (min, max) => $(v => min <= v && v <= max),
        $nonZero: () => $(v => v !== 0),
        $positive: () => $(v => v > 0),
        $nonNegative: () => $(v => v >= 0),
    };
});

export interface ArrayValidators {
    $maxLength(max: number): PropOptions;
    $notEmpty(): PropOptions;
    $all(test: (v: any) => boolean): PropOptions;
}

export const Arr = createPropOptionBuilder<any[], ObjectSupplier<any[]>, ArrayValidators>(Array, base => {
    const $ = (validator: Validator<any[]>) => ({ ...base, validator });

    return {
        $maxLength: max => $(v => v.length <= max),
        $notEmpty: () => $(v => v.length > 0),
        $all: (test) => $(v => {
            for (let i = 0; i < v.length; ++i) {
                if (!test(v[i])) {
                    return false;
                }
            }
            return true;
        })
    };
});

export const Bool = createPropOptionBuilder<boolean, Default<boolean>, undefined>(Boolean, base => undefined);
export const Func = createPropOptionBuilder<Function, ObjectSupplier<Function>, undefined>(Function, base => undefined);
export const Obj = createPropOptionBuilder<Object, ObjectSupplier<Object>, undefined>(Object, base => undefined);
export const Any = createPropOptionBuilder<any, any, undefined>(null as any, base => undefined);
export function ofType<T>(type: Prop<T>) {
    return createPropOptionBuilder<T, Default<T>, undefined>(type, base => undefined);
}

