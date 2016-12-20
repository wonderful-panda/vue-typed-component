//// Non-abstract class 'Component' does not implement inherited abstract member 'data' from class 'StatefulTypedComponent<Props, Data>'.

import * as tc from "../../..";

interface Props { foo: string };
interface Data { bar: string };

@tc.component<Props, Component>({
    props: { foo: String }
})
class Component extends tc.StatefulTypedComponent<Props, Data>{
}
