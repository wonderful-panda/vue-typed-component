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

/*
 * Wrapped type of Vue.ComponentOptions which makes `props` typesafe
 */
export type ComponentOptions<V extends Vue, Props> = Vue.ComponentOptions<V> & {
    props: PropsDefinition<Props>
}

/*
 * Wrapped type of Vue.VnodeData which makes `props` and `on` typesafe
 */
export type VNodeData<Props, Events> = Vue.VNodeData & {
    props: Partial<Props>,
    on?: { [K in keyof Events]?: EventHandler<Events[K]> }
};

/*
 * Base class for typesafe component
 */
@component_<VueComponent<any, any>>({
    beforeCreate() {
        this.$props = this;
        this.$emitEvent = this.$emit;
    }
})
export class VueComponent<Props, Events> extends Vue {
    $props: Props;
    $emitEvent: <K extends keyof Events>(event: K, arg: Events[K]) => this;
}

/*
 * Base class for typesafe component with $data
 */
export abstract class VueStatefulComponent<Props, Events, Data> extends VueComponent<Props, Events> {
    $data: Data;
    abstract data(): Data;
}

export interface ComponentDecorator {
    <Props, V extends VueComponent<Props, any>>(options: ComponentOptions<V, Props>): (target: VueClass<V>) => VueClass<V>;
}

/*
 * decorator with typesafe interface
 */
export const component: ComponentDecorator = component_;

/*
 * create element from VueComponent
 */
export function createVueComponentElement<Props, Events, V extends VueComponent<Props, Events>>(
                    h: Vue.CreateElement, tag: VueClass<V>,
                    data: VNodeData<Props, Events>,
                    children?: Vue.VNodeChildren): Vue.VNode {
    return h(tag, data, children);
}

