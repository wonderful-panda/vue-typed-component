// no error

import * as tc from "../..";

interface Props {
    foo: string;
}

@tc.component<Props, Component>({
    props: { foo: {} },
    created() {
        this.greet();
    }
})
class Component extends tc.TypedComponent<Props> {
    greet() {
    }
}

@tc.component(Component2, {
    props: { foo: {} },
    created() {
        this.greet();
    }
})
class Component2 extends tc.TypedComponent<Props> {
    greet() {
    }
}

