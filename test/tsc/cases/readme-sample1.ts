// Check sample codes in README.md successfully compiled

import * as tc from "../../..";

interface ToDoProps {
    title: string;
    done: boolean;
}

interface ToDoEvents {
    stateChanged: boolean;
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
            return {};
        }
    }

    clicked() {
        // Emit events via `$events.emit()`.
        // event name and argument type are checked by compiler.
        // `$events.on`, `$events.once`, and `$events.off` are also available.
        this.$events.emit("stateChanged", !this.$props.done);
    }
}


