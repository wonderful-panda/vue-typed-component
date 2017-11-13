import * as tc from "../..";

interface Props {
    foo: string;
}
interface Data {
    bar: string;
}

@tc.component<Props>({
    props: { foo: String }
})
class Component1    //// TS2415: Type 'number' is not assignable to type 'string'.
    extends tc.StatefulTypedComponent<Props, Data> {
    data() {
        return { bar: 1 };
    }
}

@tc.component<Props>({
    props: { foo: String }
})
class Component2    //// TS2415: Property 'bar' is missing in type '{ baz: string; }'.
    extends tc.StatefulTypedComponent<Props, Data> {
    data() {
        return { baz: "value" };
    }
}

@tc.component(Component3, {
    props: { foo: String }
})
class Component3    //// TS2415: Type 'number' is not assignable to type 'string'.
    extends tc.StatefulTypedComponent<Props, Data> {
    data() {
        return { bar: 1 };
    }
}

@tc.component(Component4, {
    props: { foo: String }
})
class Component4    //// TS2415: Property 'bar' is missing in type '{ baz: string; }'.
    extends tc.StatefulTypedComponent<Props, Data> {
    data() {
        return { baz: "value" };
    }
}
