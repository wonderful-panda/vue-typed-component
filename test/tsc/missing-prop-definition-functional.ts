import * as Vue from "vue";
import * as tc from "../..";

interface Props {
    foo: string;
}

const Component = tc.functionalComponent<Props>(
    "component",
    {  },   //// TS2345: Property 'foo' is missing
    (h: Vue.CreateElement, ctx: tc.RenderContext<Props>) => h("div")
);
