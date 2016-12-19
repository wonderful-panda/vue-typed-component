import * as Vue from "vue";
export declare type Constructor = {
    new (...args: any[]): any;
};
export declare type VueClass<V> = (new () => V) & typeof Vue;
export declare type PropsDefinition<Props> = {
    [K in keyof Props]: Vue.PropOptions | Constructor | Constructor[];
};
export declare type EventHandler<T> = ((arg: T) => any) | ((arg: T) => any)[];
export declare type ComponentOptions<V extends Vue, Props> = Vue.ComponentOptions<V> & {
    props: PropsDefinition<Props>;
};
export declare class VueComponent<Props, Events> extends Vue {
    $props: Props;
    $events: {
        emit: <K extends keyof Events>(event: K, arg: Events[K]) => any;
        on: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
        once: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
        off: <K extends keyof Events>(event: K, callback?: (arg: Events[K]) => any) => any;
    };
}
export declare abstract class VueStatefulComponent<Props, Events, Data> extends VueComponent<Props, Events> {
    $data: Data;
    abstract data(): Data;
}
export interface ComponentDecorator {
    <Props>(options: ComponentOptions<VueComponent<Props, any>, Props>): (target: VueClass<VueComponent<Props, any>>) => VueClass<VueComponent<Props, any>>;
    <Props, V extends VueComponent<Props, any>>(options: ComponentOptions<V, Props>): (target: VueClass<V>) => VueClass<V>;
}
export declare const component: ComponentDecorator;
