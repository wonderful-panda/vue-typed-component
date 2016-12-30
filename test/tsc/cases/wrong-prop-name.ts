//// Property 'foo' is missing in type '{ fooo: {}; }'.

import * as tc from "../../..";

interface Props {
    foo: string;
}

@tc.component<Props>({
    props: { fooo: {} }
})
class Component extends tc.TypedComponent<Props> {
}
