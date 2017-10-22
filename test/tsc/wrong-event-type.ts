import * as tc from "../..";

interface Events {
    event1: string;
}

@tc.component<{}, Component>({
    props: {},
    created() {
        this.$events.on("event1", this.onEvent);    //// TS2345: Type 'string' is not assignable to type 'number'.
        this.$events.once("event1", this.onEvent);  //// TS2345: Type 'string' is not assignable to type 'number'.
    }
})
class Component extends tc.EvTypedComponent<{}, Events> {
    greet() {
        const value: number = 1;
        this.$events.emit("event1", value);     //// TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
    }
    onEvent(value: number) {
    }
}
