//// Property 'props' is missing in type '{}'.

import { component, VueComponent } from "../../..";

interface Props { foo: string };

@component<Props, Component>({})
class Component extends VueComponent<Props, Component>{
}
