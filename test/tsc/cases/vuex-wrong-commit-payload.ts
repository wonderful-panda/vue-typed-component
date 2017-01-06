//// Argument of type 'true' is not assignable to parameter of type 'number'.

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
        add(state, value) {
            state.value += value;
        }
    }
});

store.commit("add", true);
