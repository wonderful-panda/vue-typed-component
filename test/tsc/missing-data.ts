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
class Component    //// TS2515: does not implement inherited abstract member 'data'
    extends tc.StatefulTypedComponent<Props, Data> {
}
