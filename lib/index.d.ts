import Vue from "vue";
import * as tsx from "vue-tsx-support/lib/api";
import { PropType } from "./types";
export declare type VueClass<T> = {
    new (...args: any[]): T;
    prototype: T;
} & typeof Vue;
export declare type PropsDefinition<PropKeys extends string> = {
    [K in PropKeys]: Vue.PropOptions | PropType;
};
export declare type EventsObject<Events> = {
    emit: <K extends keyof Events>(event: K, arg: Events[K]) => any;
    on: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    once: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    off: <K extends keyof Events>(event: K, callback?: (arg: Events[K]) => any) => any;
};
export declare type ComponentOptions<V extends Vue, Props> = Vue.ComponentOptions<V> & {
    props: PropsDefinition<keyof Props>;
};
export interface RenderContext<Props> extends Vue.RenderContext {
    props: Props;
}
export interface RenderFuncitonalComponent<Props> {
    (this: never, h: Vue.CreateElement, context: RenderContext<Props>): Vue.VNode;
}
export declare type TypedComponentBase<Props> = {
    $props: Props;
} & Vue;
export declare class TypedComponent<Props> extends Vue {
    _tsxattrs: tsx.TsxComponentAttrs<Props>;
    $props: Props;
}
export declare class EvTypedComponent<Props, Events, EventsOn = {}> extends Vue {
    $props: Props;
    $events: EventsObject<Events>;
    _tsxattrs: tsx.TsxComponentAttrs<Props, EventsOn>;
}
export declare abstract class StatefulTypedComponent<Props, Data> extends TypedComponent<Props> {
    $data: Data;
    abstract data(): Data;
}
export declare abstract class StatefulEvTypedComponent<Props, Events, Data, EventsOn = {}> extends EvTypedComponent<Props, Events, EventsOn> {
    $data: Data;
    abstract data(): Data;
}
export interface ComponentDecorator {
    <P, V extends TypedComponentBase<P>>(options: ComponentOptions<V, P>): (target: VueClass<V>) => VueClass<V>;
    <P>(options: ComponentOptions<TypedComponentBase<P>, P>): <V extends TypedComponentBase<P>>(target: VueClass<V>) => VueClass<V>;
}
export declare const component: ComponentDecorator;
export declare function functionalComponent<Props>(name: string, props: PropsDefinition<keyof Props>, render: RenderFuncitonalComponent<Props>): tsx.TsxComponent<Vue, Props, {}>;
