//// Object literal may only specify known properties, and 'fooo' does not exist in type 'PropsDefinition<Props>'.
import * as Vue from "vue";
import * as tc from "../../..";

interface Props {
    foo: string;
}

const Component = tc.functionalComponent<Props>(
    "component",
    { fooo: String },
    (h: Vue.CreateElement, ctx: tc.RenderContext<Props>) => h("div")
);
