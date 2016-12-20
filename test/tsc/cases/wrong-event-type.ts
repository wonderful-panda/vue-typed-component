//// Type 'string' is not assignable to type 'number'.
//// Type 'string' is not assignable to type 'number'.
//// Argument of type 'number' is not assignable to parameter of type 'string'.

import * as tc from "../../..";

interface Events { event1: string };

@tc.component<{}, Component>({
    props: {},
    created() {
        this.$events.on("event1", this.onEvent);
        this.$events.once("event1", this.onEvent);
    }
})
class Component extends tc.EvTypedComponent<{}, Events>{
    greet() {
        const value: number = 1;
        this.$events.emit("event1", value);
    }
    onEvent(value: number) {
    }
}
