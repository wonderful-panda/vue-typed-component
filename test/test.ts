///<reference types="mocha" />
import * as assert from "power-assert";
import * as Vue from "vue";
import * as tc from "../src/index";

type QuerySelector = (query: string) => Element;

function querySelectorOf(el: Element): QuerySelector {
    return el.querySelector.bind(el);
}

function nextTick() {
    return new Promise((resolve, _) => Vue.nextTick(resolve));
}

function mount<V extends Vue>(test: tc.VueClass<V>, props?: any, children?: Vue.VNodeChildren): { vm: Vue, target: V, $: QuerySelector } {
    const vm = new Vue({
        components: { test },
        render(h) {
            return h("div", [
                h(test, { props, ref: "target" }, children)
            ]);
        }
    }).$mount();
    const target = vm.$refs["target"] as V;
    const $ = querySelectorOf(vm.$el);
    return { vm, target, $ };
}

describe("vue-typesafe-component", function() {
    describe("test utils work properly", function() {
        it("assert()", function() {
            assert(1 + 2 === 3);
        });
        it("mount() and querySelectorOf()", function() {
            const Hello = Vue.extend({ template: `<span>Hello</span>` });
            const { vm, target, $ } = mount(Hello);
            assert(vm.$el.outerHTML === "<div><span>Hello</span></div>");
            assert(target.$el.outerHTML === "<span>Hello</span>");
            assert($("span").innerHTML === "Hello");
        });
    });
    describe("props handling of VueComponent", function() {
        it("basic functionary", function() {
            interface Props { foo: string, bar: number };
            @tc.component<Props, Testee>({
                template: `<span>{{ foo }} {{ bar }}</span>`,
                props: {
                    foo: String,
                    bar: { type: Number, default: 1 }
                }
            })
            class Testee extends tc.VueComponent<Props, {}> {}

            const { vm, target, $ } = mount(Testee, { foo: "test" });
            assert($("span").innerHTML === "test 1");
        });
        it("use $props in template", function() {
            interface Props { foo: string };
            @tc.component<Props, Testee>({
                template: `<span>{{ $props.foo }}</span>`,
                props: {
                    foo: String
                }
            })
            class Testee extends tc.VueComponent<Props, {}> {}

            const { vm, target, $ } = mount(Testee, { foo: "test" });
            assert($("span").innerHTML === "test");
        });
    });
    describe("events handling of VueComponent", function() {
        interface Props { foo: string };
        interface Events { change: string };
        @tc.component<Props, Testee>({
            template: `<span>{{ foo }}</span>`,
            props: { foo: String }
        })
        class Testee extends tc.VueComponent<Props, Events> {
        }

        it("basic functionary", async function() {
            const Parent = Vue.extend({
                components: { Testee },
                template: `<testee ref="testee" :foo="value" @change="onChange"></testee>`,
                data() { return { value: "initial value" }; },
                methods: {
                    onChange(value: string) {
                        (this.$data as any).value = value;
                    }
                }
            });

            const { vm, target, $ } = mount(Parent);
            const testee = (target.$refs as any).testee as Testee;
            assert($("span").innerHTML === "initial value");

            testee.$events.emit("change", "second value");
            await nextTick();
            assert($("span").innerHTML === "second value");
        });
        it("on and once", async function() {
            const { vm, target, $ } = mount(Testee, { foo: "value" });

            const values: string[] = [];
            const on = (v: string) => values.push("on:" + v);
            const once = (v: string) => values.push("once:" + v);

            target.$events.on("change", on);
            target.$events.once("change", once);

            target.$events.emit("change", "1");
            target.$events.emit("change", "2");

            target.$events.off("change", on);

            target.$events.emit("change", "3");

            assert.deepEqual(values, ["on:1", "once:1", "on:2"]);
        });
    });
});
