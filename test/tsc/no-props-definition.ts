import * as tc from "../..";

interface Props {
    foo: string;
}

@tc.component<Props>({})    //// TS2345: Property 'props' is missing
class Component extends tc.TypedComponent<Props> {
}
