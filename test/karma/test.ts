import * as assert from "power-assert";
import * as Vue from "vue";
import * as tc from "../../src/index";

function nextTick() {
    return new Promise((resolve, _) => Vue.nextTick(resolve));
}

describe("vue-typesafe-component", function() {
    describe("props handling of VueComponent", function() {
        it("basic functionary (props just work)", function() {
            interface Props { foo: string, bar: number };
            @tc.component<Props>({
                template: `<span>{{ foo }} {{ bar }}</span>`,
                props: {
                    foo: String,
                    bar: { type: Number, default: 1 }
                }
            })
            class Test extends tc.VueComponent<Props, {}> {}

            const vm = new Vue({
                components: { Test },
                template: `<test foo="test"></test>`
            }).$mount();

            assert(vm.$el.innerHTML === "test 1");
        });
        it("use $props in template", function() {
            interface Props { foo: string };
            @tc.component<Props>({
                template: `<span>{{ $props.foo }}</span>`,
                props: {
                    foo: String
                }
            })
            class Test extends tc.VueComponent<Props, {}> {}

            const vm = new Vue({
                components: { Test },
                template: `<test foo="test"></test>`
            }).$mount();
            assert(vm.$el.innerHTML === "test");
        });
    });
    describe("events handling of VueComponent", function() {
        interface Props { foo: string };
        interface Events { change: string };
        @tc.component<Props>({
            template: `<span>{{ foo }}</span>`,
            props: { foo: String }
        })
        class Test extends tc.VueComponent<Props, Events> {
        }

        it("basic functionary (emit just works)", async function() {
            const vm = new Vue({
                components: { Test },
                data() { return { value: "initial value" }; },
                template: `<test ref="test" :foo="value" @change="onChange"></test>`,
                methods: {
                    onChange(value: string) {
                        (this.$data as any).value = value;
                    }
                }
            }).$mount();

            assert(vm.$el.innerHTML === "initial value");
            const test = (vm.$refs as any).test as Test;
            assert(test != null);

            test.$events.emit("change", "second value");
            await nextTick();
            assert(vm.$el.innerHTML === "second value");
        });
        it("on, once, and off", async function() {
            const vm = new Vue({
                components: { Test },
                data() { return { value: "initial value" }; },
                template: `<test ref="test" :foo="value" @change="onChange"></test>`,
                methods: {
                    onChange(value: string) {
                        (this.$data as any).value = value;
                    }
                }
            }).$mount();

            const test = (vm.$refs as any).test as Test;
            assert(test != null);

            const values: string[] = [];
            const on = (v: string) => values.push("on:" + v);
            const once = (v: string) => values.push("once:" + v);

            test.$events.on("change", on);
            test.$events.once("change", once);

            test.$events.emit("change", "1");
            test.$events.emit("change", "2");

            test.$events.off("change", on);

            test.$events.emit("change", "3");

            assert.deepEqual(values, ["on:1", "once:1", "on:2"]);
        });
    });
});
