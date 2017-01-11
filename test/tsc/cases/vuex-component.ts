/// no error

import * as tcx from "../../../lib/vuex";

const store = tcx.createStore({
    state: { value: 0 },
    mutations: {
        add(state, value: number) {
            state.value += value;
        }
    }
});

store.commit("add", 1);
