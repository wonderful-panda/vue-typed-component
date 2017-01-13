import * as Vuex from "vuex";
import * as _ from "lodash";

export type KV<K extends string, V> = { [_ in K]: V };

export type Payload<T, V> = { type: T } & V;

export interface Dispatch<A> {
    <K extends keyof A>(payload: Payload<K, A[K]>, options?: Vuex.DispatchOptions): Promise<any[]>;
    <K extends keyof A>(type: K, payload: A[K], options?: Vuex.DispatchOptions): Promise<any[]>;
}

export interface Commit<M> {
    <K extends keyof M>(payload: Payload<K, M[K]>, options?: Vuex.CommitOptions): void;
    <K extends keyof M>(type: K, payload: M[K], options?: Vuex.CommitOptions): void;
}

export interface ActionContext<TState, TMutations, TActions, TGetters, TRootState> extends Vuex.ActionContext<TState, TRootState> {
    dispatch: Dispatch<TActions>;
    commit: Commit<TMutations>;
    getters: TGetters;
}

export type MutationTree<TState, TPayloads> = {
    [K in keyof TPayloads]: (state: TState, payload: TPayloads[K]) => any
} & Vuex.MutationTree<TState>;

export type ActionTree<TState, TMutations, TActions, TGetters, TPayloads, TRootState> = {
    [K in keyof TPayloads]: (injectee: ActionContext<TState, TMutations, TActions & TPayloads, TGetters, TRootState>, payload: TPayloads[K]) => any
} & Vuex.ActionTree<TState, TRootState>;

export type GetterTree<TState, TGetters, TPayloads, TRootState, TRootGetters> = {
    [K in keyof TPayloads]: (state: TState, getters: TGetters & TPayloads, rootState: TRootState, rootGetters: TRootGetters) => TPayloads[K];
} & Vuex.GetterTree<TState, TRootState>;


export interface MergedModule<TState, TMutations, TActions, TGetters, TRootState, TRootGetters> {
    $types?: {
        state: TState,
        mutations: TMutations,
        actions: TActions,
        getters: TGetters,
        rootState: TRootState,
        rootGetters: TRootGetters
    };
    body: Vuex.Module<TState, TRootState>;
}

export interface Module<TState, TMutations, TActions, TGetters,
                        TTreeState extends TState, TTreeMutations, TTreeActions, TTreeGetters,
                        TRootState, TRootGetters> extends Vuex.Module<TState, TRootState> {

    mutations?: MutationTree<TTreeState, TMutations>;
    actions?: ActionTree<TTreeState, TTreeMutations, TTreeActions, TTreeGetters, TActions, TRootState>;
    getters?: GetterTree<TTreeState, TTreeGetters, TGetters, TRootState, TRootGetters>;
}

export interface StoreOptions<TState, TMutations, TActions, TGetters, TTreeState extends TState, TTreeMutations, TTreeActions, TTreeGetters> extends Vuex.StoreOptions<TState> {
    mutations?: MutationTree<TTreeState, TMutations>;
    actions?: ActionTree<TTreeState, TTreeMutations, TTreeActions, TTreeGetters, TActions, TTreeState>;
    getters?: GetterTree<TTreeState, TTreeGetters, TGetters, TTreeState, TTreeGetters>;
}

export interface Store<TState, TMutations, TActions, TGetters> extends Vuex.Store<TState> {
    dispatch: Dispatch<TActions>;
    commit: Commit<TMutations>;
    readonly getters: TGetters;
}


export class Builder<S, M, A, G, RS, RG> {
    constructor(public options: any) {
    }

    module<S2, M2, A2, G2, N extends string>(name: N, m: MergedModule<S2, M2, A2, G2, any, any>): Builder<S & KV<N, S2>, M & M2, A & A2, G & G2, RS, RG> {
        const modules = { [<string>name]: m.body };
        return new Builder<S & KV<N, S2>, M & M2, A & A2, G & G2, RS, RG>(_.merge({}, this.options, { modules }));
    }
    build<TState>(options: StoreOptions<TState, {}, {}, {}, TState & S, M, A, G>)
        : Store<TState & S, M, A, G>;
    build<TState, TMutations>(options: StoreOptions<TState, TMutations, {}, {}, TState & S, TMutations & M, A, G>)
        : Store<TState & S, TMutations & M, A, G>;
    build<TState, TMutations, TActions>(options: StoreOptions<TState, TMutations, TActions, {}, TState & S, TMutations & M, TActions & A, G>)
        : Store<TState & S, TMutations & M, TActions & A, G>;
    build<TState, TMutations, TActions, TGetters>(options: StoreOptions<TState, TMutations, TActions, TGetters, TState & S, TMutations & M, TActions & A, TGetters & G>)
        : Store<TState & S, TMutations & M, TActions & A, TGetters & G>;
    build(options: Vuex.StoreOptions<any>) {
        return new Vuex.Store(options);
    }
    buildModule<TState>(body: Module<TState, {}, {}, {}, TState & S, M, A, G, any, any>)
        : MergedModule<TState & S, M, A, G, RS, RG>;
    buildModule<TState, TMutations>(body: Module<TState, TMutations, {}, {}, TState & S, TMutations & M, A, G, any, any>)
        : MergedModule<TState & S, TMutations & M, A, G, RS, RG>;
    buildModule<TState, TMutations, TActions>(body: Module<TState, TMutations, TActions, {}, TState & S, TMutations & M, TActions & A, G, any, any>)
        : MergedModule<TState & S, TMutations & M, TActions & A, G, RS, RG>;
    buildModule<TState, TMutations, TActions, TGetters>(body: Module<TState, TMutations, TActions, TGetters, TState & S, TMutations & M, TActions & A, TGetters & G, any, any>)
        : MergedModule<TState & S, TMutations & M, TActions & A, TGetters & G, RS, RG>;
    buildModule(body: Vuex.Module<any, any>) {
        return { body };
    }
}

export const builder = new Builder<{}, {}, {}, {}, {}, {}>({});

export function createBuilder<TRootState, TRootGetters>(): Builder<{}, {}, {}, {}, TRootState, TRootGetters> {
    return new Builder<{}, {}, {}, {}, TRootState, TRootGetters>({});
}
