// Check sample codes in README.md successfully compiled

import * as tc from "../../..";

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
