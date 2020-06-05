import { createContext } from "react";

const TodoContext = createContext ({
    todoList : [], 
    updateTodo : (index, todo) => {},
    removeTodo : (index)=>{}
})


export default TodoContext