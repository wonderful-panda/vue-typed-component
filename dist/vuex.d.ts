import * as Vuex from "vuex";
export declare namespace types {
    type Payload<T, V> = {
        type: T;
    } & V;
    interface Dispatch<A> {
        <K extends keyof A>(type: K, payload: A[K], options?: Vuex.DispatchOptions): Promise<any[]>;
        <K extends keyof A>(payload: Payload<K, A[K]>, options?: Vuex.DispatchOptions): Promise<any[]>;
    }
    interface Commit<M> {
        <K extends keyof M>(type: M, payload: M[K], options?: Vuex.CommitOptions): void;
        <K extends keyof M>(payload: Payload<K, M[K]>, options?: Vuex.CommitOptions): void;
    }
    interface ActionContext<S, A, M, G> extends Vuex.ActionContext<S, any> {
        dispatch: Dispatch<A>;
        commit: Commit<M>;
        getters: G;
    }
    type Mutations<S, M> = {
        [K in keyof M]: (state: S, payload: M[K]) => any;
    } & Vuex.MutationTree<S>;
    type Actions<S, A, M, G> = {
        [K in keyof A]: (injectee: ActionContext<S, A, M, G>, payload: A[K]) => any;
    } & Vuex.ActionTree<S, any>;
    type Getters<S, G> = {
        [K in keyof G]: (state: S, getters: G, rootState: any, rootGetters: any) => G[K];
    } & Vuex.GetterTree<S, any>;
    interface StoreOptions<S, A, M, G> extends Vuex.StoreOptions<S> {
        actions: Actions<S, A, M, G>;
        mutations: Mutations<S, M>;
        getters: Getters<S, G>;
    }
    interface Store<S, A, M, G> extends Vuex.Store<S> {
        dispatch: Dispatch<A>;
        commit: Commit<M>;
        getters: G;
    }
}
export declare function createStore<S, A, M, G>(options: types.StoreOptions<S, A, M, G>): types.Store<S, A, M, G>;
