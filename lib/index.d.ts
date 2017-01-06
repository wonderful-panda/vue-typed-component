import * as Vue from "vue";
import { PropType } from "./types";
export declare type VueClass<V> = (new () => V) & typeof Vue;
export declare type PropsDefinition<Props> = {
    [K in keyof Props]: Vue.PropOptions | PropType;
};
export declare type EventsObject<Events> = {
    emit: <K extends keyof Events>(event: K, arg: Events[K]) => any;
    on: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    once: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    off: <K extends keyof Events>(event: K, callback?: (arg: Events[K]) => any) => any;
};
export declare type ComponentOptions<V extends Vue, Props> = Vue.ComponentOptions<V> & {
    props: PropsDefinition<Props>;
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
    $props: Props;
}
export declare class EvTypedComponent<Props, Events> extends Vue {
    $props: Props;
    $events: EventsObject<Events>;
}
export declare abstract class StatefulTypedComponent<Props, Data> extends TypedComponent<Props> {
    $data: Data;
    abstract data(): Data;
}
export declare abstract class StatefulEvTypedComponent<Props, Events, Data> extends EvTypedComponent<Props, Events> {
    $data: Data;
    abstract data(): Data;
}
export interface ComponentDecorator {
    <P, V extends TypedComponentBase<P>>(options: ComponentOptions<V, P>): (target: VueClass<V>) => VueClass<V>;
    <P>(options: ComponentOptions<TypedComponentBase<P>, P>): <V extends TypedComponentBase<P>>(target: VueClass<V>) => VueClass<V>;
}
export declare const component: ComponentDecorator;
export declare function functionalComponent<Props>(name: string, props: PropsDefinition<Props>, render: RenderFuncitonalComponent<Props>): VueClass<Vue>;
