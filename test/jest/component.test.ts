import Vue, { VNode } from "vue";
Vue.config.productionTip = false;
import * as tc from "../..";

async function mount(component: typeof Vue, props: any): Promise<Vue> {
    const vm = new Vue({
        render(h) {
            return h(component, { props });
        }
    }).$mount();
    await Vue.nextTick();
    return vm;
}

describe("vue-typed-component", () => {
    describe("TypedComponent", () => {
        it("basic functionary (props just work)", async () => {
            interface Props {
                foo: string;
                bar: number;
            }
            @tc.component<Props>({
                props: {
                    foo: String,
                    bar: { type: Number, default: 1 }
                },
                template: "<span>{{ foo }} {{ bar }}</span>"
            })
            class Test extends tc.TypedComponent<Props> {}

            const vm = await mount(Test, { foo: "test" });
            expect(vm.$el.innerHTML).toBe("test 1");
        });

        it("use $props in template", async () => {
            interface Props {
                foo: string;
            }
            @tc.component<Props>({
                template: `<span>{{ $props.foo }}</span>`,
                props: {
                    foo: String
                }
            })
            class Test extends tc.TypedComponent<Props> {}

            const vm = await mount(Test, { foo: "test" });
            expect(vm.$el.innerHTML).toBe("test");
        });
    });

    describe("EvTypedComponent", () => {
        interface Props {
            foo: string;
        }
        interface Events {
            change: string;
        }
        @tc.component<Props>({
            template: `<span>{{ foo }}</span>`,
            props: { foo: String }
        })
        class Test extends tc.EvTypedComponent<Props, Events> {}

        async function createVm() {
            const vm = new Vue({
                data() {
                    return { value: "initial value" };
                },
                methods: {
                    onChange(value: string): void {
                        this.value = value;
                    }
                },
                render(h): VNode {
                    return h(Test, { ref: "test", props: { foo: this.value }, on: { change: this.onChange } });
                }
            }).$mount();
            await Vue.nextTick();
            return vm;
        }

        it("basic functionary (emit just works)", async () => {
            const vm = await createVm();
            expect(vm.$el.innerHTML).toBe("initial value");
            const test = (vm.$refs as any).test as Test;
            expect(test).not.toBeNull();

            test.$events.emit("change", "second value");
            await Vue.nextTick();
            expect(vm.$el.innerHTML).toBe("second value");
        });

        it("on, once, and off", async () => {
            const vm = await createVm();
            const test = (vm.$refs as any).test as Test;
            expect(test).not.toBeNull();

            const values: string[] = [];
            const on = (v: string) => values.push("on:" + v);
            const once = (v: string) => values.push("once:" + v);

            test.$events.on("change", on);
            test.$events.once("change", once);

            test.$events.emit("change", "1");
            test.$events.emit("change", "2");

            test.$events.off("change", on);

            test.$events.emit("change", "3");

            expect(values).toEqual(["on:1", "once:1", "on:2"]);
        });
    });

    describe("functional component", () => {
        it("basic functionary", async () => {
            interface Props {
                foo: string;
                bar: number;
            }
            const Test = tc.functionalComponent<Props>(
                "test",
                {
                    foo: { type: String, required: true },
                    bar: { type: Number, default: 1 }
                },
                (h, { props }) => {
                    return h("span", [props.foo + props.bar.toString()]);
                }
            );
            const vm = await mount(Test, { foo: "value" });
            expect(vm.$el.innerHTML).toBe("value1");
        });
    });
});
