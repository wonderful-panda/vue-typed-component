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

export type Actions<S, M, A, G, RootS> = {
    [K in keyof A]: (injectee: ActionContext<S, M, A, G>, payload: A[K]) => any;
} & Vuex.ActionTree<S, RootS>;

export type Getters<S, G, RootS, RootG> = {
    [K in keyof G]: (state: S, getters: G, rootState: RootS, rootGetters: RootG) => G[K];
} & Vuex.GetterTree<S, RootS>;

export type KV<K extends string, V> = { [_ in K]: V };

export interface ModuleDef<S, M, A, G, RootS, RootG> extends Vuex.Module<S, RootS> {
    state?: S;
    mutations?: Mutations<S, M>;
    actions?: Actions<S, M, A, G, RootS>;
    getters?: Getters<S, G, RootS, RootG>;
}

export interface NamedModule<N extends string, S, M, A, G> extends ModuleDef<S, M, A, G, any, any> {
    name: N;
};

export type MergedModule<S, M, A, G> = {
    [key: string]: Vuex.Module<any, any>;
} & {
    // dummy object to keep type info
    _merged: { state: S, mutationPayloads: M, actionPayloads: A, getters: G }
};

function modules<N1 extends string, S1, M1, A1, G1,
                 N2 extends string, S2, M2, A2, G2>(
            m1: NamedModule<N1, S1, M1, A1, G1>,
            m2: NamedModule<N2, S2, M2, A2, G2>
): MergedModule<KV<N1, S1> & KV<N2, S2>,
                M1 & M2,
                A1 & A2,
                G1 & G2>;

function modules<N1 extends string, S1, M1, A1, G1,
                 N2 extends string, S2, M2, A2, G2,
                 N3 extends string, S3, M3, A3, G3>(
            m1: NamedModule<N1, S1, M1, A1, G1>,
            m2: NamedModule<N2, S2, M2, A2, G2>,
            m3: NamedModule<N3, S3, M3, A3, G3>,
): MergedModule<KV<N1, S1> & KV<N2, S2> & KV<N3, S3>,
                M1 & M2 & M3,
                A1 & A2 & A3,
                G1 & G2 & G3>;

function modules<N1 extends string, S1, M1, A1, G1,
                 N2 extends string, S2, M2, A2, G2,
                 N3 extends string, S3, M3, A3, G3,
                 N4 extends string, S4, M4, A4, G4>(
            m1: NamedModule<N1, S1, M1, A1, G1>,
            m2: NamedModule<N2, S2, M2, A2, G2>,
            m3: NamedModule<N3, S3, M3, A3, G3>,
            m4: NamedModule<N4, S4, M4, A4, G4>,
): MergedModule<KV<N1, S1> & KV<N2, S2> & KV<N3, S3> & KV<N4, S4>,
                M1 & M2 & M3 & M4,
                A1 & A2 & A3 & A4,
                G1 & G2 & G3 & G4>;

function modules<N1 extends string, S1, M1, A1, G1,
                 N2 extends string, S2, M2, A2, G2,
                 N3 extends string, S3, M3, A3, G3,
                 N4 extends string, S4, M4, A4, G4,
                 N5 extends string, S5, M5, A5, G5>(
            m1: NamedModule<N1, S1, M1, A1, G1>,
            m2: NamedModule<N2, S2, M2, A2, G2>,
            m3: NamedModule<N3, S3, M3, A3, G3>,
            m4: NamedModule<N4, S4, M4, A4, G4>,
            m5: NamedModule<N5, S5, M5, A5, G5>,
): MergedModule<KV<N1, S1> & KV<N2, S2> & KV<N3, S3> & KV<N4, S4> & KV<N5, S5>,
                M1 & M2 & M3 & M4 & M5,
                A1 & A2 & A3 & A4 & A5,
                G1 & G2 & G3 & G4 & G5>;

function modules<S1, M1, A1, G1,
                 S2, M2, A2, G2>(
            m1: MergedModule<S1, M1, A1, G1>,
            m2: MergedModule<S2, M2, A2, G2>
): MergedModule<S1 & S2, M1 & M2,
                A1 & A2, G1 & G2>;

function modules<S1, M1, A1, G1,
                 S2, M2, A2, G2,
                 S3, M3, A3, G3>(
            m1: MergedModule<S1, M1, A1, G1>,
            m2: MergedModule<S2, M2, A2, G2>,
            m3: MergedModule<S3, M3, A3, G3>,
): MergedModule<S1 & S2 & S3,
                M1 & M2 & M3,
                A1 & A2 & A3,
                G1 & G2 & G3>;

function modules<S1, M1, A1, G1,
                 S2, M2, A2, G2,
                 S3, M3, A3, G3,
                 S4, M4, A4, G4>(
            m1: MergedModule<S1, M1, A1, G1>,
            m2: MergedModule<S2, M2, A2, G2>,
            m3: MergedModule<S3, M3, A3, G3>,
            m4: MergedModule<S4, M4, A4, G4>,
): MergedModule<S1 & S2 & S3 & S4,
                M1 & M2 & M3 & M4,
                A1 & A2 & A3 & A4,
                G1 & G2 & G3 & G4>;

function modules<S1, M1, A1, G1,
                 S2, M2, A2, G2,
                 S3, M3, A3, G3,
                 S4, M4, A4, G4,
                 S5, M5, A5, G5>(
            m1: MergedModule<S1, M1, A1, G1>,
            m2: MergedModule<S2, M2, A2, G2>,
            m3: MergedModule<S3, M3, A3, G3>,
            m4: MergedModule<S4, M4, A4, G4>,
            m5: MergedModule<S5, M5, A5, G5>,
): MergedModule<S1 & S2 & S3 & S4 & S5,
                M1 & M2 & M3 & M4 & M5,
                A1 & A2 & A3 & A4 & A5,
                G1 & G2 & G3 & G4 & G5>;

function modules(...modules: any[]): any {
    return modules.reduce((prev, cur) => {
        if (cur._merged) {
            Object.assign(prev, cur);
        }
        else {
            const { name, ...rest } = cur;
            prev[name] = rest;
        }
    }, { _merged: {} });
}

export interface StoreOptions<S, M, A, G> extends Vuex.StoreOptions<S> {
    mutations?: Mutations<S, M>;
    actions?: Actions<S, M, A, G, S>;
    getters?: Getters<S, G, S, G>;
}

export interface Store<S, M, A, G> extends Vuex.Store<S> {
    commit: Commit<M>;
    dispatch: Dispatch<A>;
    getters: G;
}

export interface $CreateStore {
    <S, M> (options: StoreOptions<S, M, undefined, undefined>): Store<S, M, undefined, undefined>;
    <S, M, A> (options: StoreOptions<S, M, A, undefined>): Store<S, M, A, undefined>;
    <S, M, A, G> (options: StoreOptions<S, M, A, G>): Store<S, M, A, G>;
}

export const createStore: $CreateStore = (options: Vuex.StoreOptions<any>) => new Vuex.Store(options);
