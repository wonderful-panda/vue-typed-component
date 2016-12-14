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
export declare type VNodeData<Props, Events> = Vue.VNodeData & {
    props: Partial<Props>;
    on?: {
        [K in keyof Events]?: EventHandler<Events[K]>;
    };
};
export declare class VueComponent<Props, Events> extends Vue {
    $props: Props;
    $emitEvent: <K extends keyof Events>(event: K, arg: Events[K]) => this;
}
export declare abstract class VueStatefulComponent<Props, Events, Data> extends VueComponent<Props, Events> {
    $data: Data;
    abstract data(): Data;
}
export interface ComponentDecorator {
    <Props, V extends VueComponent<Props, any>>(options: ComponentOptions<V, Props>): (target: VueClass<V>) => VueClass<V>;
}
export declare const component: ComponentDecorator;
export declare function createVueComponentElement<Props, Events, V extends VueComponent<Props, Events>>(h: Vue.CreateElement, tag: VueClass<V>, data: VNodeData<Props, Events>, children?: Vue.VNodeChildren): Vue.VNode;
