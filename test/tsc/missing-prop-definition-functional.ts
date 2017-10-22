import Vue, { CreateElement, RenderContext } from "vue";
import * as tc from "../..";

interface Props {
    foo: string;
}

const Component = tc.functionalComponent<Props>(
    "component",
    {  },   //// TS2345: Property 'foo' is missing
    (h: CreateElement, ctx: RenderContext<Props>) => h("div")
);
