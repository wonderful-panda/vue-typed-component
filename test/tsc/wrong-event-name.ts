

import * as tc from "../..";

interface Events {
    event1: string;
}

@tc.component<{}, Component>({
    props: {},
    created() {
        this.$events.on("event2", this.onEvent);    //// TS2345: Argument of type '"event2"' is not assignable to parameter of type '"event1"'.
        this.$events.once("event3", this.onEvent);  //// TS2345: Argument of type '"event3"' is not assignable to parameter of type '"event1"'.
    }
})
class Component extends tc.EvTypedComponent<{}, Events> {
    greet() {
        this.$events.emit("event4", "value");   //// TS2345: Argument of type '"event4"' is not assignable to parameter of type '"event1"'.
    }
    onEvent(value: string) {
    }
}
