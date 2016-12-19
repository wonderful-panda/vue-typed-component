//// Property 'foo' is missing in type '{ fooo: {}; }'.

import { component, VueComponent } from "../../..";

interface Props { foo: string };

@component<Props, Component>({
    props: { fooo: {} }
})
class Component extends VueComponent<Props, Component>{
}
