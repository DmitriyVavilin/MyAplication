import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/Todolist/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}


function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Graph Ql", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
    ])


    const removeTask = (taskId: string) => {
        const filterTasks = tasks.filter((el) => el.id !== taskId)
        setTasks(filterTasks)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: true}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    const onChangeCheckBox = (taskId: string, eventValue: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: eventValue} : el))

    }


    let todoLists: Array<TodoListType> = [
        {id: v1(), title: 'What to learn', filter: 'completed'},
        {id: v1(), title: 'What to buy', filter: 'active'}
    ]

    return (
        <div className="App">
            {todoLists.map((tl) => {
                let tasksForTodolist = tasks
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks.filter((el) => !el.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks.filter((el) => el.isDone)
                }
                return (
                    <TodoList title={tl.title}
                              filter={tl.filter}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              onChangeCheckBox={onChangeCheckBox}
                    />)
            })}
        </div>
    );
}

export default App;
