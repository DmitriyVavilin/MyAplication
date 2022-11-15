import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const [tasks,setTasks]= useState<TaskType[]> ([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Graph Ql", isDone: false },
        { id: 5, title: "Redux", isDone: true },
    ])

    const [filter, setFilter]=useState<FilterValueType>('all')

    const removeTask = (taskId: number) => {
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


    return (
        <div className="App">
            <TodoList title={'Whats to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
