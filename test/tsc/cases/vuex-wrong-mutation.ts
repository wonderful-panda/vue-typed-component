//// Property 'add' is missing in type '{ ad(state: State, value: any): void; }'.

import * as tcx from "../../../lib/vuex";

interface State {
    value: number;
}

interface Mutations {
    add: number;
}

const store = tcx.createStore<State, Mutations>({
    state: { value: 0 },
    mutations: {
        ad(state, value) {
            state.value += value;
        }
    }
});

store.commit("add", 1);
