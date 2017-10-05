[![Build Status](https://travis-ci.org/wonderful-panda/vue-typed-component.svg?branch=master)](https://travis-ci.org/wonderful-panda/vue-typed-component)

# vue-typed-component
Make vue-class-component more typesafe

## Requirement
TypeScript >= 2.3

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

@tc.component<ToDoProps, ToDo>({
    // each prop names are checked by compiler
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

If you want to define component with `$data`, use `VueStatefulComponent` instead.

```typescript
import * as tc from "vue-typed-component"

interface ToDoProps {
    title: string;
}

interface ToDoData {
    done: boolean;
}

@tc.component<ToDoProps, ToDo>({
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
