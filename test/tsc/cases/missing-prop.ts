//// Property 'bar' is missing in type '{ foo: StringConstructor; }'.

import { component, VueComponent } from "../../..";

interface Props { foo: string, bar: string };

@component<Props>({
    props: { foo: String }
})
class Component extends VueComponent<Props, {}>{
}
