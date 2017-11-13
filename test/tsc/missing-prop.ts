import * as tc from "../..";

interface Props {
    foo: string;
    bar: string;
}

@tc.component<Props>({  //// TS2345: Property 'bar' is missing
    props: { foo: String }
})
class Component extends tc.TypedComponent<Props> {
}

@tc.component(Component2, {  //// TS2345: Property 'bar' is missing
    props: { foo: String }
})
class Component2 extends tc.TypedComponent<Props> {
}
