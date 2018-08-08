[![Build Status](https://travis-ci.org/wonderful-panda/vue-typed-component.svg?branch=master)](https://travis-ci.org/wonderful-panda/vue-typed-component)

# vue-typed-component
Make vue-class-component more typesafe

## Requirement
- TypeScript >= 2.8
- Vue >= 2.5.13

## Breaking changes
- 0.11.0
  - Support TypeScript >= 2.8 only.
  - Support Vue >= 2.5.13 only.
- 0.10.0
  - Undocumented api `props` has removed. Use [vue-strict-prop](https://github.com/wonderful-panda/vue-strict-prop) instead.

## Install

install from npm:

```console
npm install vue-typed-component -S
```

and install peer dependencies from npm:

```console
npm install vue vue-class-component vue-tsx-support -S
```

## Example

```typescript
import * as tc from "vue-typed-component"

interface ToDoProps {
    title: string;
    done: boolean;
}

interface ToDoEvents {
    stateChanged: boolean
}

@tc.component(ToDo /* pass target class itself as first argument */, {
    // each prop names and types are checked by compiler
    props: {
        title: { type: String, required: true },
        done: { type: Boolean, default: false }
    },
    template: `
        <div @click="clicked">
            <span :style="style">{{ title }}</span>
        </div>
    `
})
class ToDo extends tc.EvTypedComponent<ToDoProps, ToDoEvents> {
    // If events are not needed,
    // use TypedComponent<Props> instead
    get style() {
        // Access each props via `$props`
        if (this.$props.done) {
            return { textDecoration: "line-through" };
        }
        else {
            return {}
        }
    }

    clicked() {
        // Emit events via `$events.emit()`.
        // event name and argument type are checked by compiler.
        // `$events.on`, `$events.once`, and `$events.off` are also available.
        this.$events.emit("stateChanged", !this.$props.done);
    }
}
```

You can specify type parameters explicitly instead of passing target class as first argument.
(just for backward compatibility)

```typescript
@tc.component<ToDoProps, ToDo>({
    props: {
        title: { type: String, required: true },
        done: { type: Boolean, default: false }
    },
    template: `
        <div @click="clicked">
            <span :style="style">{{ title }}</span>
        </div>
    `
})
class ToDo extends tc.EvTypedComponent<ToDoProps, ToDoEvents> {
    /* snip */
}
```

If you want to define component with `$data`, use `VueStatefulComponent` instead.

```typescript
import * as tc from "vue-typed-component"

interface ToDoProps {
    title: string;
}

interface ToDoData {
    done: boolean;
}

@tc.component(ToDo, {
    // each prop names are checked by compiler
    props: {
        title: { type: String, required: true }
    },
    template: `
        <div @click="clicked">
            <span :style="style">{{ title }}</span>
        </div>
    `
})
class ToDo extends tc.StatefulTypedComponent<ToDoProps, ToDoData> {
    // If events are needed,
    // use StatefulEvTypedComponent<Props, Events, Data> instead

    // data() method existance and return type of it are checked by compiler
    data() {
        return { done: false };
    }

    get style() {
        // Access each data via `$data`
        if (this.$data.done) {
            return { textDecoration: "line-through" };
        }
        else {
            return {};
        }
    }

    clicked() {
        this.$data.done = !this.$data.done;
    }
}
```

Helper function to define functional component is also in.

**Duprecated** : because `Vue.extend` is now type-safe enough for functional component

```typescript
import * as tc from "vue-typed-component"

interface ToDoProps {
    id: string;
    title: string;
}

const ToDo = tc.functionalComponent<ToDoProps>(
    "ToDo",
    {
        id: { type: String, required: true },
        title: { type: String, required: true }
    },
    (h, { props }) => {
        return h("span", { attrs: { id: props.id } }, [ props.title ]);
    }
);
```
