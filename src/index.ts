import * as Vue from "vue";
import component_ from "vue-class-component";

export type Constructor = {
    new (...args: any[]): any;
}

export type VueClass<V> = (new () => V) & typeof Vue;

export type PropsDefinition<Props> = {
    [K in keyof Props]: Vue.PropOptions | Constructor | Constructor[]
};
export type EventHandler<T> = ((arg: T) => any) | ((arg: T) => any)[];

export type EventsObject<Events> = {
    emit: <K extends keyof Events>(event: K, arg: Events[K]) => any;
    on: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    once: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    off: <K extends keyof Events>(event: K, callback?: (arg: Events[K]) => any) => any;
}

/*
 * Wrapped type of Vue.ComponentOptions which makes `props` typesafe
 */
export type ComponentOptions<V extends Vue, Props> = Vue.ComponentOptions<V> & {
    props: PropsDefinition<Props>
}

export interface TypedComponentBase<Props> {
    $props: Props;
}

/*
 * Base class for typesafe component
 */
@component_<TypedComponent<any>>({
    beforeCreate() {
        this.$props = this;
    }
})
export class TypedComponent<Props> extends Vue {
    $props: Props;
}

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

/*
 * Base class for typesafe component with $data
 */
export abstract class StatefulTypedComponent<Props, Data> extends TypedComponent<Props> {
    $data: Data;
    abstract data(): Data;
}
export abstract class StatefulEvTypedComponent<Props, Events, Data> extends EvTypedComponent<Props, Events> {
    $data: Data;
    abstract data(): Data;
}

export interface ComponentDecorator {
    <P, V extends TypedComponentBase<P> & Vue>(options: ComponentOptions<V, P>): (target: VueClass<V>) => VueClass<V>;
}

/*
 * decorator with typesafe interface
 */
export const component: ComponentDecorator = component_;

export interface RenderContext<Props> extends Vue.RenderContext {
  props: Props;
}

export interface RenderFuncitonalComponent<Props> {
    (this: never, h: Vue.CreateElement, context: RenderContext<Props>): Vue.VNode;
}

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
