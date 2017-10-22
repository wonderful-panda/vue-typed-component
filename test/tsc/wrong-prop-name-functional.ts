import Vue, { CreateElement, RenderContext } from "vue";
import * as tc from "../..";

interface Props {
    foo: string;
}

const Component = tc.functionalComponent<Props>(
    "component",
    { fooo: String },   //// TS2345: Object literal may only specify known properties, and 'fooo' does not exist in type 'PropsDefinition<"foo">'.
    (h: CreateElement, ctx: RenderContext<Props>) => h("div")
);
