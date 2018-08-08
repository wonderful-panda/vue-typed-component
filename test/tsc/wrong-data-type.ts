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
class Component1 extends tc.StatefulTypedComponent<Props, Data> {
    data() {        //// TS2416: Type 'number' is not assignable to type 'string'.
        return { bar: 1 };
    }
}

@tc.component<Props>({
    props: { foo: String }
})
class Component2 extends tc.StatefulTypedComponent<Props, Data> {
    data() {        //// TS2416: Property 'bar' is missing in type '{ baz: string; }'.
        return { baz: "value" };
    }
}

@tc.component(Component3, {
    props: { foo: String }
})
class Component3 extends tc.StatefulTypedComponent<Props, Data> {
    data() {        //// TS2416: Type 'number' is not assignable to type 'string'.
        return { bar: 1 };
    }
}

@tc.component(Component4, {
    props: { foo: String }
})
class Component4 extends tc.StatefulTypedComponent<Props, Data> {
    data() {        //// TS2416: Property 'bar' is missing in type '{ baz: string; }'.
        return { baz: "value" };
    }
}
