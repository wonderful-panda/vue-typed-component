//// Property 'bar' is missing in type '{ foo: StringConstructor; }'.

import * as tc from "../../..";

interface Props { foo: string, bar: string };

@tc.component<Props, Component>({
    props: { foo: String }
})
class Component extends tc.TypedComponent<Props>{
}
