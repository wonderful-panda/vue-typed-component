//// Argument of type '"event2"' is not assignable to parameter of type '"event1"'.
//// Argument of type '"event3"' is not assignable to parameter of type '"event1"'.
//// Argument of type '"event4"' is not assignable to parameter of type '"event1"'.

import { component, VueComponent } from "../../..";

interface Events { event1: string };

@component<{}, Component>({
    props: {},
    created() {
        this.$events.on("event2", this.onEvent);
        this.$events.once("event3", this.onEvent);
    }
})
class Component extends VueComponent<{}, Events>{
    greet() {
        this.$events.emit("event4", "value");
    }
    onEvent(value: string) {
    }
}
