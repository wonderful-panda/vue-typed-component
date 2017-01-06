import * as Vuex from "vuex";

/*
 * Meaning of generic types
 *  S : State
 *  M : Mutations
 *  A : Actions
 *  G : Getters
 */

export type Payload<T, V> = { type: T } & V;
export interface Dispatch<A> {
    <K extends keyof A>(payload: Payload<K, A[K]>, options?: Vuex.DispatchOptions): Promise<any[]>;
    <K extends keyof A>(type: K, payload: A[K], options?: Vuex.DispatchOptions): Promise<any[]>;
};
export interface Commit<M> {
    <K extends keyof M>(payload: Payload<K, M[K]>, options?: Vuex.CommitOptions): void;
    <K extends keyof M>(type: K, payload: M[K], options?: Vuex.CommitOptions): void;
}
export interface ActionContext<S, M, A, G> extends Vuex.ActionContext<S, any> {
    dispatch: Dispatch<A>;
    commit: Commit<M>;
    getters: G;
}

export type Mutations<S, M> = {
    [K in keyof M]: (state: S, payload: M[K]) => any;
} & Vuex.MutationTree<S>;

export type Actions<S, M, A, G> = {
    [K in keyof A]: (injectee: ActionContext<S, M, A, G>, payload: A[K]) => any;
} & Vuex.ActionTree<S, any>;

export type Getters<S, G> = {
    [K in keyof G]: (state: S, getters: G, rootState: any, rootGetters: any) => G[K];
} & Vuex.GetterTree<S, any>;

export interface StoreOptionsM<S, M> extends Vuex.StoreOptions<S> {
    mutations: Mutations<S, M>;
}
export interface StoreOptionsMA<S, M, A> extends StoreOptionsM<S, M> {
    actions: Actions<S, M, A, undefined>;
}
export interface StoreOptionsMAG<S, M, A, G> extends StoreOptionsM<S, M> {
    actions: Actions<S, M, A, G>;
    getters: Getters<S, G>;
}

export interface Store<S, M, A, G> extends Vuex.Store<S> {
    commit: Commit<M>;
    dispatch: Dispatch<A>;
    getters: G;
}

export interface $CreateStore {
    <S, M> (options: StoreOptionsM<S, M>): Store<S, M, undefined, undefined>;
    <S, M, A> (options: StoreOptionsMA<S, M, A>): Store<S, M, A, undefined>;
    <S, M, A, G> (options: StoreOptionsMAG<S, M, A, G>): Store<S, M, A, G>;
}

export const createStore: $CreateStore = (options: Vuex.StoreOptions<any>) => new Vuex.Store(options);
