import * as tc from "../..";

interface Props {
    str: string;
    num: number;
    bool: boolean;
    arr: string[];
}

@tc.component(Component1, { //// TS2345: Types of property 'str' are incompatible
    props: {
        str: Number,
        num: Number,
        bool: Boolean,
        arr: Array
    }
})
class Component1 extends tc.TypedComponent<Props> {
}

@tc.component(Component2, { //// TS2345: Types of property 'num' are incompatible
    props: {
        str: String,
        num: String,
        bool: Boolean,
        arr: Array
    }
})
class Component2 extends tc.TypedComponent<Props> {
}

@tc.component(Component3, { //// TS2345: Types of property 'bool' are incompatible
    props: {
        str: String,
        num: Number,
        bool: String,
        arr: Array
    }
})
class Component3 extends tc.TypedComponent<Props> {
}

@tc.component(Component4, { //// TS2345: Types of property 'arr' are incompatible
    props: {
        str: String,
        num: Number,
        bool: Boolean,
        arr: String
    }
})
class Component4 extends tc.TypedComponent<Props> {
}

