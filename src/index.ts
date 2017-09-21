import Vue from "vue";
import * as tsx from "vue-tsx-support/lib/api";
import component_ from "vue-class-component";
import { PropType } from "./types";

export type VueClass<T> = {
    new (...args: any[]): T;
    prototype: T;
} & typeof Vue;


/*
 * Mapped types
 */
export type PropsDefinition<PropKeys extends string> = {
    [K in PropKeys]: Vue.PropOptions | PropType
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
export type ComponentOptions<V extends Vue, Props> = Vue.ComponentOptions<V> & {
    props: PropsDefinition<keyof Props>
};

export interface RenderContext<Props> extends Vue.RenderContext {
  props: Props;
}

export interface RenderFuncitonalComponent<Props> {
    (this: never, h: Vue.CreateElement, context: RenderContext<Props>): Vue.VNode;
}


/*
 * Base classes of typesafe Component
 */
export type TypedComponentBase<Props> = { $props: Props } & Vue;

// for component which has props
@component_<TypedComponent<any>>({})
export class TypedComponent<Props> extends Vue {
    _tsxattrs: tsx.TsxComponentAttrs<Props>;
    $props: Props;
}

// for component which has props and events
@component_<EvTypedComponent<any, any>>({
    beforeCreate() {
        this.$events = {
            emit: this.$emit.bind(this),
            on: this.$on.bind(this),
            once: this.$once.bind(this),
            off: this.$off.bind(this)
        };
    }
})
export class EvTypedComponent<Props, Events, EventsOn = {}> extends Vue {
    $props: Props;
    $events: EventsObject<Events>;
    _tsxattrs: tsx.TsxComponentAttrs<Props, EventsOn>;
}

// for component which has props and data
export abstract class StatefulTypedComponent<Props, Data> extends TypedComponent<Props> {
    $data: Data;
    abstract data(): Data;
}

// for component which has props, events and data
export abstract class StatefulEvTypedComponent<Props, Events, Data, EventsOn = {}> extends EvTypedComponent<Props, Events, EventsOn> {
    $data: Data;
    abstract data(): Data;
}


/*
 * Typesafe definition of decorator
 */
export interface ComponentDecorator {
    <P, V extends TypedComponentBase<P>>(options: ComponentOptions<V, P>): (target: VueClass<V>) => VueClass<V>;
    <P>(options: ComponentOptions<TypedComponentBase<P>, P>): <V extends TypedComponentBase<P>>(target: VueClass<V>) => VueClass<V>;
}
export const component: ComponentDecorator = component_;


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

