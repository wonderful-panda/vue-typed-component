// this code does not cause no error now

import * as tc from "../..";

interface Props {
    foo: string;
}

@tc.component<Props>({
    props: { foo: { type: String }, bar: {} }
})
class Component extends tc.TypedComponent<Props> {
}

@tc.component(Component2, {
    props: { foo: { type: String }, bar: {} }
})
class Component2 extends tc.TypedComponent<Props> {
}
