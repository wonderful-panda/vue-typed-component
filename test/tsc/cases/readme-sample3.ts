// Check sample codes in README.md successfully compiled

import * as tc from "../../.."

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

