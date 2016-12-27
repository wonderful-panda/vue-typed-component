import * as Vue from "vue";
import { PropType } from "./types";

export type Supplier<T> = () => T
export type Default<T> = T | Supplier<T>;
export type Validator<T> = (value: T) => boolean;

export interface PropOrValidator<T, V> extends Vue.PropOptions {
    Validator: (v: Validator<T>) => Vue.PropOptions;
    Validators: V;
}

export interface PropOptionBuilder<T, TDefault, V> extends PropOrValidator<T, V> {
    Required: PropOrValidator<T, V>;
    Default(value: TDefault): PropOrValidator<T, V>;
}

function createPropOptionBuilder<T, TDefault, V>(type: PropType, createValidators: (base: Vue.PropOptions) => V): PropOptionBuilder<T, TDefault, V> {
    function createPartial(base: Vue.PropOptions): PropOrValidator<T, V> {
        return {
            Validator: (validator: Validator<T>) => ({ ...base, validator }),
            Validators: createValidators(base),
            ...base
        };
    }
    return {
        ...createPartial({ type }),
        Required: createPartial({ type, required: true }),
        Default(value: TDefault) { return createPartial({ type, default: value }) }
    };
}

export interface StringValidators {
    in(...values: string[]): Vue.PropOptions;
    match(pattern: RegExp): Vue.PropOptions;
}

export const Str = createPropOptionBuilder<string, Default<string>, StringValidators>(String, base => {
    const $ = (validator: Validator<string>) => ({ ...base, validator });
    return {
        in: (...values) => $(v => values.indexOf(v) >= 0),
        match: pattern => $(v => pattern.test(v))
    };
});

export interface NumberValidators {
    lessThan(max: number): Vue.PropOptions;
    greaterThan(min: number): Vue.PropOptions;
    lessEqual(max: number): Vue.PropOptions;
    greaterEqual(min: number): Vue.PropOptions;
    between(min: number, max: number): Vue.PropOptions;
    nonZero(): Vue.PropOptions;
}

export const Num = createPropOptionBuilder<number, Default<number>, NumberValidators>(Number, base => {
    const $ = (validator: Validator<number>) => ({ ...base, validator });

    return {
        lessThan: (max) => $(v => v < max),
        greaterThan: (min) => $(v => min < v),
        lessEqual: (max) => $(v => v <= max),
        greaterEqual: (min) => $(v => min <= v),
        between: (min, max) => $(v => min <= v && v <= max),
        nonZero: () => $(v => v !== 0)
    };
});

export interface ArrayValidators {
    maxLength(max: number): Vue.PropOptions;
    notEmpty(): Vue.PropOptions;
    all(test: (v: any) => boolean): Vue.PropOptions;
}

export const Arr = createPropOptionBuilder<any[], Supplier<any[]>, ArrayValidators>(Array, base => {
    const $ = (validator: Validator<any[]>) => ({ ...base, validator });

    return {
        maxLength: max => $(v => v.length <= max),
        notEmpty: () => $(v => v.length > 0),
        all: (test) => $(v => {
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
export const Func = createPropOptionBuilder<(...args: any[]) => any, Supplier<(...args: any[]) => any>, undefined>(Function, base => undefined);
export const Obj = createPropOptionBuilder<{}, Supplier<{}>, undefined>(Object, base => undefined);
export const Any = createPropOptionBuilder<null, any, undefined>(null, base => undefined);
export function ofType(type: PropType) {
    return createPropOptionBuilder<any, any, undefined>(type, base => undefined);
}

