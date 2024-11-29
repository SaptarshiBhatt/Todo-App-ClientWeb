import { atomWithStorage } from "jotai/utils";
import { Todo } from "./TodoType";

export const UpdateAtom = atomWithStorage<Todo>("todo", {
    isCompleted: false,
    text: "",
    uid: ""
})