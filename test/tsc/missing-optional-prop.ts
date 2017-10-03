import * as Vue from "vue";
import * as tc from "../..";

interface Props {
    foo: string;
    bar?: string;
}

const Component = tc.functionalComponent<Props>(
    "component",
    { foo: String },   //// TS2345: Property 'bar' is missing
    (h: Vue.CreateElement, ctx: tc.RenderContext<Props>) => h("div")
);
