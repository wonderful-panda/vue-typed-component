# vue-typesafe-component
Make vue-class-component more typesafe

## Requirement
TypeScript >= 2.1

## Example

```typescript
import { component, VueComponent } from 'vue-typesafe-component'

interface ToDoProps {
    title: string;
    done: boolean;
}

interface ToDoEvents {
    stateChanged: boolean
}

@component<ToDoProps, ToDo>({
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
class ToDo extends VueComponent<ToDoProps, ToDoEvents> {
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
import { component, VueStatefulComponent } from 'vue-typesafe-component'

interface ToDoProps {
    title: string;
}

interface ToDoEvents {
    // no events
}

interface ToDoData {
    done: boolean;
}

@component<ToDoProps, ToDo>({
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
class ToDo extends VueStatefulComponent<ToDoProps, ToDoEvents, ToDoData> {
    // `data()` method existance and return type of it are checked by compiler
    data() {
        return { done: false };
    }

    get style() {
        // Access each data via `$data`
        if (this.$data.done) {
            return { textDecoration: "line-through" };
        }
        else {
            return {}
        }
    }

    clicked() {
        this.$data.done = !this.$data.done;
    }
}
```
