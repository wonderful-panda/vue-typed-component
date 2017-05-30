import * as assert from "power-assert";
import Vue from "vue";
import * as tc from "../..";
import * as p from "../../lib/props";

const orgConsoleError = console.error;

function assertConsoleError<TRet>(func: () => TRet, ...expectedMessages: RegExp[]): TRet {
    const orgConsoleError = console.error;
    try {
        console.error = function(msg: string) {
            const expected = expectedMessages.shift();
            if (expected === undefined) {
                assert.fail(`unexpected console output: ${msg}`);
            }
            else {
                assert(expected.test(msg));
            }
        };
        const ret = func();
        assert(expectedMessages.length === 0);
        return ret;
    }
    finally {
        console.error = orgConsoleError;
    }
}

function nextTick() {
    return new Promise((resolve, _) => Vue.nextTick(resolve));
}

describe("vue-typesafe-component", function() {
    describe("TypedComponent", function() {
        it("basic functionary (props just work)", function() {
            interface Props {
                foo: string;
                bar: number;
            }
            @tc.component<Props>({
                template: `<span>{{ foo }} {{ bar }}</span>`,
                props: {
                    foo: String,
                    bar: { type: Number, default: 1 }
                }
            })
            class Test extends tc.TypedComponent<Props> {}

            const vm = new Vue({
                components: { Test },
                template: `<test foo="test"></test>`
            }).$mount();

            assert(vm.$el.innerHTML === "test 1");
        });
        it("use $props in template", function() {
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

            const vm = new Vue({
                components: { Test },
                template: `<test foo="test"></test>`
            }).$mount();
            assert(vm.$el.innerHTML === "test");
        });
    });
    describe("EvTypedComponent", function() {
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
        class Test extends tc.EvTypedComponent<Props, Events> {
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
    describe("functional component", function() {
        it("basic functionary", function() {
            interface Props {
                foo: string;
                bar: number;
            }
            const render: tc.RenderFuncitonalComponent<Props> = (h, context) => {
                return h("div");
            };
            const Test = tc.functionalComponent<Props>(
                "test",
                {
                    foo: { type: String, required: true },
                    bar: { type: Number, default: 1 }
                },
                (h, { props }) => {
                    return h("span", [ props.foo + props.bar.toString() ]);
                }
            );
            const vm = new Vue({
                components: { Test },
                template: `<test foo="value"></test>`,
            }).$mount();
            assert(vm.$el.innerHTML === "value1");
        });
    });
    describe("prop option builder", function() {
        function createComponent(prop: Vue.PropOptions) {
            return Vue.extend({
                name: "test",
                props: { foo: prop },
                template: `<span>{{ foo }}</span>`
            });
        }
        function tester(prop: Vue.PropOptions) {
            const components = { Test: createComponent(prop) };
            return function(templateOrPropOptions: string | Vue.ComponentOptions<Vue>, ...messages: RegExp[]): Vue {
                let opt: Vue.ComponentOptions<Vue>;
                if (typeof templateOrPropOptions === "string") {
                    opt = { template: templateOrPropOptions, components };
                }
                else {
                    opt = { components, ...templateOrPropOptions };
                }
                return assertConsoleError(() => {
                    return new Vue(opt).$mount();
                }, ...messages);
            };
        }
        describe("Str", function() {
            const t = tester(p.Str);

            it("string value", function() {
                t(`<test foo="a"></test>`);
            });
            it("Unexpected type", function() {
                t(`<test :foo="1"></test>`,
                  /^\[Vue warn\]: Invalid prop.* Expected String/);
            });
            it("prop is optional", function() {
                t(`<test></test>`);
            });
        });
        describe("Str.Required", function() {
            const t = tester(p.Str.Required);
            it("string value", function() {
                t(`<test foo="a"></test>`);
            });
            it("prop is required", function() {
                t(`<test></test>`,
                  /^\[Vue warn\]: Missing required prop/);
            });
        });
        describe("Str.Default", function() {
            const t = tester(p.Str.Default("default value"));
            it("explicitly specified", function() {
                const vm = t(`<test foo="a"></test>`);
                assert(vm.$el.innerHTML === "a");
            });
            it("no value specified", function() {
                const vm = t(`<test></test>`);
                assert(vm.$el.innerHTML === "default value");
            });
        });
        describe("Str.Validator", function() {
            const validationError = /^\[Vue warn\]: Invalid prop.* custom validator/;
            it ("custom validator", function() {
                const t = tester(p.Str.Validator(v => v.startsWith("a")));
                t(`<test foo="abc"></test>`);
                t(`<test foo="A"></test>`, validationError);
            });
            it ("validator: in", function() {
                const t = tester(p.Str.$in("a", "b"));
                t(`<test foo="a"></test>`);
                t(`<test foo="b"></test>`);
                t(`<test foo="c"></test>`, validationError);
            });
            it ("validator: match", function() {
                const t = tester(p.Str.$match(/^[0-9]+$/));
                t(`<test foo="123"></test>`);
                t(`<test foo="10a"></test>`, validationError);
            });
            it ("validator with Required", function() {
                const t = tester(p.Str.Required.$match(/^A/));
                t(`<test foo="a"></test>`, validationError);
            });
            it ("validator with Default", function() {
                const t = tester(p.Str.Default("a").$match(/^A/));
                t(`<test></test>`, validationError);
            });
        });
        describe("Num.Validator", function() {
            const validationError = /^\[Vue warn\]: Invalid prop.* custom validator/;
            it ("validator: greaterThan", function() {
                const t = tester(p.Num.$greaterThan(1));
                t(`<test :foo="1.1"></test>`);
                t(`<test :foo="1"></test>`, validationError);
            });
            it ("validator: lessThan", function() {
                const t = tester(p.Num.$lessThan(1));
                t(`<test :foo="0.9"></test>`);
                t(`<test :foo="1"></test>`, validationError);
            });
            it ("validator: greaterEqual", function() {
                const t = tester(p.Num.$greaterEqual(1));
                t(`<test :foo="1"></test>`);
                t(`<test :foo="0.9"></test>`, validationError);
            });
            it ("validator: lessEqual", function() {
                const t = tester(p.Num.$lessEqual(1));
                t(`<test :foo="1"></test>`);
                t(`<test :foo="1.1"></test>`, validationError);
            });
            it ("validator: between", function() {
                const t = tester(p.Num.$between(1, 2));
                t(`<test :foo="1"></test>`);
                t(`<test :foo="2"></test>`);
                t(`<test :foo="0.9"></test>`, validationError);
                t(`<test :foo="2.1"></test>`, validationError);
            });
            it ("validator: nonZero", function() {
                const t = tester(p.Num.$nonZero());
                t(`<test :foo="1"></test>`);
                t(`<test :foo="0"></test>`, validationError);
            });
        });
        describe("Arr.Validator", function() {
            const validationError = /^\[Vue warn\]: Invalid prop.* custom validator/;
            it ("validator: notEmpty", function() {
                const t = tester(p.Arr.$notEmpty());
                t(`<test :foo="[1]"></test>`);
                t(`<test :foo="[]"></test>`, validationError);
            });
            it ("validator: maxLength", function() {
                const t = tester(p.Arr.$maxLength(2));
                t(`<test :foo="[1, 2]"></test>`);
                t(`<test :foo="[1, 2, 3]"></test>`, validationError);
            });
            it ("validator: all", function() {
                const t = tester(p.Arr.$all(v => v > 1));
                t(`<test :foo="[2, 3, 4]"></test>`);
                t(`<test :foo="[]"></test>`);
                t(`<test :foo="[3, 2, 1]"></test>`, validationError);
            });
        });
        describe("Bool", function() {
            const t = tester(p.Bool);

            it("bool value", function() {
                t(`<test :foo="true"></test>`);
            });
            it("Unexpected type", function() {
                t(`<test foo="a"></test>`,
                  /^\[Vue warn\]: Invalid prop.* Expected Boolean/);
            });
        });
        describe("Func", function() {
            const t = tester(p.Func);

            it("bool value", function() {
                t(`<test :foo="function () { return 1; }"></test>`);
            });
            it("Unexpected type", function() {
                t(`<test foo="a"></test>`,
                  /^\[Vue warn\]: Invalid prop.* Expected Function/);
            });
        });
        describe("Obj", function() {
            const t = tester(p.Obj);

            it("obj value", function() {
                t(`<test :foo="{ value: 1 }"></test>`);
            });
            it("Unexpected type", function() {
                t(`<test foo="a"></test>`,
                  /^\[Vue warn\]: Invalid prop.* Expected Object/);
            });
        });
        describe("Any", function() {
            const t = tester(p.Any);

            it("any types are accepted", function() {
                t(`<test foo="a"></test>`);
                t(`<test :foo="1"></test>`);
                t(`<test :foo="true"></test>`);
                t(`<test :foo="{ value: 1 }"></test>`);
            });
        });
        describe("ofType", function() {
            class Foo {
                constructor(public foo: number) {
                }
            }
            class Bar {
                constructor(public foo: number) {
                }
            }

            const t = tester(p.ofType(Foo));

            it("instance of specified class", function() {
                t({
                    template: `<test :foo="foo"></test>`,
                    computed: {
                        foo() { return new Foo(0); }
                    }
                });
            });
            it("instance of other class", function() {
                t({
                    template: `<test :foo="foo"></test>`,
                    computed: {
                        foo() { return new Bar(0); }
                    }
                }, /^\[Vue warn\]: Invalid prop.* Expected Foo/);
            });
        });

    });
});
