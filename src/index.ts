import * as Vue from "vue";
import component_ from "vue-class-component";
import { PropType } from "./types";
import * as po from "./propOptions";

/*
 * copy from d.ts of vue-class-component
 */
export type VueClass<V> = (new () => V) & typeof Vue;


/*
 * Mapped types
 */
export type PropsDefinition<Props> = {
    [K in keyof Props]: Vue.PropOptions | PropType
};

export type EventsObject<Events> = {
    emit: <K extends keyof Events>(event: K, arg: Events[K]) => any;
    on: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    once: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    off: <K extends keyof Events>(event: K, callback?: (arg: Events[K]) => any) => any;
}


/*
 * Typesafe wrappers of types exposed from vue
 */
export type ComponentOptions<V extends Vue, Props> = Vue.ComponentOptions<V> & {
    props: PropsDefinition<Props>
}

export interface RenderContext<Props> extends Vue.RenderContext {
  props: Props;
}

export interface RenderFuncitonalComponent<Props> {
    (this: never, h: Vue.CreateElement, context: RenderContext<Props>): Vue.VNode;
}


/*
 * Base classes of typesafe Component
 */
export interface TypedComponentBase<Props> {
    $props: Props;
}

// for component which has props
@component_<TypedComponent<any>>({
    beforeCreate() {
        this.$props = this;
    }
})
export class TypedComponent<Props> extends Vue {
    $props: Props;
}

// for component which has props and events
@component_<EvTypedComponent<any, any>>({
    beforeCreate() {
        this.$props = this;
        this.$events = {
            emit: this.$emit.bind(this),
            on: this.$on.bind(this),
            once: this.$once.bind(this),
            off: this.$off.bind(this)
        };
    }
})
export class EvTypedComponent<Props, Events> extends Vue {
    $props: Props;
    $events: EventsObject<Events>;
}

// for component which has props and data
export abstract class StatefulTypedComponent<Props, Data> extends TypedComponent<Props> {
    $data: Data;
    abstract data(): Data;
}

// for component which has props, events and data
export abstract class StatefulEvTypedComponent<Props, Events, Data> extends EvTypedComponent<Props, Events> {
    $data: Data;
    abstract data(): Data;
}


/*
 * Typesafe definition of decorator
 */
export interface ComponentDecorator {
    <P, V extends TypedComponentBase<P> & Vue>(options: ComponentOptions<V, P>): (target: VueClass<V>) => VueClass<V>;
}
export const component: ComponentDecorator = component_;


/*
 * Typesafe helper to define functional component
 */
export function functionalComponent<Props>(
                    name: string,
                    props: PropsDefinition<Props>,
                    render: RenderFuncitonalComponent<Props>): VueClass<Vue> {
    return Vue.extend({
        functional: true,
        name,
        props: props as any,
        render
    });
}

export namespace PropOptions {
    export const Str = po.Str;
    export const Num = po.Num;
    export const Bool = po.Bool;
    export const Func = po.Func;
    export const Obj = po.Obj;
    export const Arr = po.Arr;
    export const Any = po.Any;
    export const ofType = po.ofType;
}
