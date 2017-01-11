//// Argument of type '"ad"' is not assignable to parameter of type '"add"'.

import * as tcx from "../../../lib/vuex";

const store = tcx.createStore({
    state: { value: 0 },
    mutations: {
        add(state, value: number) {
            state.value += value;
        }
    }
});

store.commit("ad", 1);
