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
 * Base class for typesafe component
 */
@component_<VueComponent<any, any>>({
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
export class VueComponent<Props, Events> extends Vue {
    $props: Props;
    $events: {
        emit: <K extends keyof Events>(event: K, arg: Events[K]) => any;
        on: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
        once: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
        off: <K extends keyof Events>(event: K, callback?: (arg: Events[K]) => any) => any;
    };
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

