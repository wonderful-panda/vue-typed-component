// this code does not cause no error now

import * as tc from "../../..";

interface Props { foo: string };

@tc.component<Props, Component>({
    props: { foo: {type: String}, bar: {} }
})
class Component extends tc.TypedComponent<Props> {
}
