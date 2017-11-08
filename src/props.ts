import Vue, { PropOptions } from "vue";
import { Prop } from "vue/types/options";

export type AnyFunc = (...args: any[]) => any;

export type Validator<T> = (value: T) => boolean;

export interface PropOptionsFinisher<T> {
    readonly required: PropOptions<T>;
    readonly optional: PropOptions<T | undefined>;
    default(value: T | (() => T & object)): PropOptions<T>;
    default(value: undefined): PropOptions<T | undefined>;
    default(value: null): PropOptions<T | null>;
}

export interface PropOptionsBuilder<T> extends PropOptionsFinisher<T> {
    validator(validator: Validator<T>): PropOptionsFinisher<T>;
}

export interface ChainablePropOptionsBuilder<T> extends PropOptionsBuilder<T> {
    readonly or: BuilderFactory<T>;
}

export interface BuilderFactory<BaseType> {
    readonly str: ChainablePropOptionsBuilder<BaseType | string>;
    readonly num: ChainablePropOptionsBuilder<BaseType | number>;
    readonly bool: ChainablePropOptionsBuilder<BaseType | boolean>;
    func<T extends AnyFunc>(): ChainablePropOptionsBuilder<BaseType | T>;
    array<T>(): ChainablePropOptionsBuilder<BaseType | T[]>;
    readonlyArray<T>(): ChainablePropOptionsBuilder<BaseType | ReadonlyArray<T>>;
    eitherArray<T>(): ChainablePropOptionsBuilder<BaseType | T[] | ReadonlyArray<T>>;
    obj<T extends object>(): ChainablePropOptionsBuilder<BaseType | T>;
    instanceOf<T1, T2 = never, T3 = never, T4 = never, T5 = never>(
        p1: Prop<T1>,
        p2?: Prop<T2>,
        p3?: Prop<T3>,
        p4?: Prop<T4>,
        p5?: Prop<T5>
    ): ChainablePropOptionsBuilder<BaseType | T1 | T2 | T3 | T4 | T5>;
}

class BuilderClass<T> implements ChainablePropOptionsBuilder<T> {
    constructor(private opts: PropOptions<T>) {}
    default(value: any) {
        return { ...this.opts, required: false, default: value };
    }
    get required() {
        return { ...this.opts, required: true };
    }
    get optional() {
        return { ...this.opts, required: false };
    }
    validator(validator: Validator<T>) {
        return new BuilderClass({ ...this.opts, validator });
    }
    get or() {
        const type = this.opts.type || [];
        const types = type instanceof Array ? type : [type];
        return createFactory(types);
    }
}

function createBuilder<BaseType, T>(
    baseTypes: Array<Prop<BaseType>>,
    ...types: Array<Prop<T>>
): ChainablePropOptionsBuilder<BaseType | T> {
    const newTypes = [...baseTypes, ...types] as Array<Prop<BaseType | T>>;
    return new BuilderClass({ type: newTypes.length === 1 ? newTypes[0] : newTypes });
}

function createFactory<BaseType>(baseTypes: Array<Prop<BaseType>>): BuilderFactory<BaseType> {
    return {
        str: createBuilder(baseTypes, String),
        num: createBuilder(baseTypes, Number),
        bool: createBuilder(baseTypes, Boolean),
        func<T extends AnyFunc>() {
            return createBuilder(baseTypes, Function as any) as ChainablePropOptionsBuilder<BaseType | T>;
        },
        array<T>() {
            return createBuilder(baseTypes, Array);
        },
        readonlyArray<T>() {
            return createBuilder(baseTypes, Array);
        },
        eitherArray<T>() {
            return createBuilder(baseTypes, Array);
        },
        obj<T extends object>() {
            return createBuilder(baseTypes, Object);
        },
        instanceOf(...args: Array<Prop<any>>) {
            return createBuilder(baseTypes, ...args);
        }
    };
}

const rootFactory = createFactory<never>([]);
export const props = {
    ...rootFactory,
    stringLiteral<T extends string>(...values: T[]): PropOptionsFinisher<T> {
        return new BuilderClass<T>({
            type: String as any,
            validator: (v: string) => values.indexOf(v as T) >= 0
        });
    },
    anything: new BuilderClass<any>({}) as PropOptionsBuilder<any>
};
