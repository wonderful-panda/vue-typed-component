// this code does not cause no error now

import { component, VueComponent } from "../../..";

interface Props { foo: string };

@component<Props, Component>({
    props: { foo: {type: String}, bar: {} }
})
class Component extends VueComponent<Props, Component>{
}
