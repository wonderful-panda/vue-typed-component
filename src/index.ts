import Vue, { PropOptions, ComponentOptions, CreateElement, RenderContext, VNode } from "vue";
import { PropValidator, ThisTypedComponentOptionsWithRecordProps } from "vue/types/options";
import * as tsx from "vue-tsx-support";
import component_ from "vue-class-component";

export type VueClass<T> = {
    new (...args: any[]): T;
    prototype: T;
} & typeof Vue;


/*
 * Mapped types
 */
export type PropsDefinition<PropKeys extends string> = {
    [K in PropKeys]: PropValidator<any>
};

export type EventsObject<Events> = {
    emit: <K extends keyof Events>(event: K, arg: Events[K]) => any;
    on: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    once: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    off: <K extends keyof Events>(event: K, callback?: (arg: Events[K]) => any) => any;
};


/*
 * Typesafe wrappers of types exposed from vue
 */
export type PropTypedComponentOptions<V extends Vue, Props> = ComponentOptions<V> & {
    props: PropsDefinition<keyof Props>
};

export interface RenderFuncitonalComponent<Props> {
    (this: never, h: CreateElement, context: RenderContext<Props>): VNode;
}


/*
 * Base classes of typesafe Component
 */
export type TypedComponentBase<Props> = { $props: Props } & Vue;

// for component which has props
export class TypedComponent<Props, ScopedSlots = {}> extends tsx.Component<Props, {}, ScopedSlots> {
    $props: Props;
}

// for component which has props and events
export class EvTypedComponent<Props, Events, EventsOn = {}, ScopedSlots = {}> extends tsx.Component<Props, EventsOn, ScopedSlots> {
    $props: Props;
    get $events(): EventsObject<Events> {
        return {
            emit: this.$emit.bind(this),
            on: this.$on.bind(this),
            once: this.$once.bind(this),
            off: this.$off.bind(this)
        };
    }
}

// for component which has props and data
export abstract class StatefulTypedComponent<Props, Data, ScopedSlots = {}> extends tsx.Component<Props, {}, ScopedSlots> {
    $props: Props;
    $data: Data;
    abstract data(): Data;
}

// for component which has props, events and data
export abstract class StatefulEvTypedComponent<Props, Events, Data, EventsOn = {}, ScopedSlots = {}> extends tsx.Component<Props, EventsOn, ScopedSlots> {
    $props: Props;
    get $events(): EventsObject<Events> {
        return {
            emit: this.$emit.bind(this),
            on: this.$on.bind(this),
            once: this.$once.bind(this),
            off: this.$off.bind(this)
        };
    }
    $data: Data;
    abstract data(): Data;
}

/*
 * Typesafe definition of decorator
 */
export interface ComponentDecorator<V extends Vue> {
    (origClass: VueClass<V>): VueClass<V>;
}

// convert `{ foo?: X, bar?: Y }` to `{ foo: X|undefined, bar: Y|undefined }`
export type StripOptional<T> = T & Record<keyof T, {}>;

export interface ComponentDecoratorFactory {
  <Props, V extends TypedComponentBase<Props>>(
      origClass: VueClass<V & TypedComponentBase<Props>>,
      options: ThisTypedComponentOptionsWithRecordProps<V, {}, {}, {}, StripOptional<Props>>
  ): ComponentDecorator<V>;

  <Props, V extends TypedComponentBase<Props> = TypedComponentBase<Props>>(
      options: PropTypedComponentOptions<V, Props> & ThisType<V>
  ): ComponentDecorator<V>;
}

export const component: ComponentDecoratorFactory = function(...args: any[]): ComponentDecorator<Vue> {
    return component_(args[1] || args[0]);
};

/*
 * Typesafe helper to define functional component
 */
export function functionalComponent<Props>(
                    name: string,
                    props: PropsDefinition<keyof Props>,
                    render: RenderFuncitonalComponent<Props>): tsx.TsxComponent<Vue, Props, {}> {
    return Vue.extend({
        functional: true,
        name,
        props: props as any,
        render
    }) as any;
}

