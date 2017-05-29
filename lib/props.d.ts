import Vue from "vue";
import { PropType } from "./types";
export declare type Supplier<T> = () => T;
export declare type Default<T> = T | Supplier<T>;
export declare type Validator<T> = (value: T) => boolean;
export declare type PropOrValidator<T, V> = Vue.PropOptions & V & {
    Validator: (v: Validator<T>) => Vue.PropOptions;
};
export declare type PropOptionBuilder<T, TDefault, V> = PropOrValidator<T, V> & {
    Required: PropOrValidator<T, V>;
    Default(value: TDefault): PropOrValidator<T, V>;
};
export interface StringValidators {
    $in(...values: string[]): Vue.PropOptions;
    $match(pattern: RegExp): Vue.PropOptions;
}
export declare const Str: PropOptionBuilder<string, Default<string>, StringValidators>;
export interface NumberValidators {
    $lessThan(max: number): Vue.PropOptions;
    $greaterThan(min: number): Vue.PropOptions;
    $lessEqual(max: number): Vue.PropOptions;
    $greaterEqual(min: number): Vue.PropOptions;
    $between(min: number, max: number): Vue.PropOptions;
    $nonZero(): Vue.PropOptions;
    $positive(): Vue.PropOptions;
    $nonNegative(): Vue.PropOptions;
}
export declare const Num: PropOptionBuilder<number, Default<number>, NumberValidators>;
export interface ArrayValidators {
    $maxLength(max: number): Vue.PropOptions;
    $notEmpty(): Vue.PropOptions;
    $all(test: (v: any) => boolean): Vue.PropOptions;
}
export declare const Arr: PropOptionBuilder<any[], Supplier<any[]>, ArrayValidators>;
export declare const Bool: PropOptionBuilder<boolean, Default<boolean>, undefined>;
export declare const Func: PropOptionBuilder<(...args: any[]) => any, Supplier<(...args: any[]) => any>, undefined>;
export declare const Obj: PropOptionBuilder<{}, Supplier<{}>, undefined>;
export declare const Any: PropOptionBuilder<null, any, undefined>;
export declare function ofType(type: PropType): PropOptionBuilder<any, any, undefined>;
