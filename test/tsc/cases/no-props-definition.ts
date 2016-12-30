//// Property 'props' is missing in type '{}'.

import * as tc from "../../..";

interface Props {
    foo: string;
}

@tc.component<Props>({})
class Component extends tc.TypedComponent<Props> {
}
