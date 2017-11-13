import * as tc from "../..";

interface Props {
    foo: string;
    bar?: number;
    baz: string[];
}

@tc.component(Component, {
    props: {
        foo: String,
        bar: Number,
        baz: Array
    }
})
class Component extends tc.TypedComponent<Props> {
}
