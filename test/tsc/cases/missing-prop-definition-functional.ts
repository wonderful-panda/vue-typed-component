//// Property 'foo' is missing in type '{}'.
import * as Vue from "vue";
import * as tc from "../../..";

interface Props { foo: string };

const Component = tc.functionalComponent<Props>(
    "component",
    {  },
    (h: Vue.CreateElement, ctx: tc.RenderContext<Props>) => h("div")
);
