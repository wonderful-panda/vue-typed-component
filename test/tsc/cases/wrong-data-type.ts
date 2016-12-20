//// Type 'number' is not assignable to type 'string'.
//// Property 'bar' is missing in type '{ baz: string; }'.
import * as tc from "../../..";

interface Props { foo: string };
interface Data { bar: string };

@tc.component<Props, Component1>({
    props: { foo: String }
})
class Component1 extends tc.StatefulTypedComponent<Props, Data>{
    data() {
        return { bar: 1 };
    }
}

@tc.component<Props, Component2>({
    props: { foo: String }
})
class Component2 extends tc.StatefulTypedComponent<Props, Data>{
    data() {
        return { baz: "value" };
    }
}
