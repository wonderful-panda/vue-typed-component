
import * as tc from "../..";

interface Props {
    foo: string;
}

@tc.component<Props>({  //// TS2345: Property 'foo' is missing in type '{ fooo: {}; }'.
    props: { fooo: {} }
})
class Component extends tc.TypedComponent<Props> {
}
