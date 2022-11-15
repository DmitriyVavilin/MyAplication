import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const [tasks,setTasks]= useState<TaskType[]> ([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Graph Ql", isDone: false },
        { id: v1(), title: "Redux", isDone: true },
    ])

    const [filter, setFilter]=useState<FilterValueType>('all')

    const removeTask = (taskId: string) => {
        const filterTasks = tasks.filter((el) => el.id !== taskId)
        setTasks(filterTasks)
    }

    let tasksForTodolist = tasks
    if(filter === 'active'){
        tasksForTodolist = tasks.filter((el) => !el.isDone)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter((el) => el.isDone)
    }

    const changeFilter = (value: FilterValueType) => {
      setFilter(value)
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: true}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    return (
        <div className="App">
            <TodoList title={'Whats to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
