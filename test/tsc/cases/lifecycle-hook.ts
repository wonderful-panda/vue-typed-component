// no error

import * as tc from "../../..";

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
        console.log("hi");
    }
}
