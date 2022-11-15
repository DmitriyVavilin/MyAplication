import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValueType, TaskType} from "../App";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string)=>void
    changeFilter:(value: FilterValueType)=>void
    addTask:(title: string)=>void
}

export const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle]=useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            addTask()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
       setTitle(event.currentTarget.value)
    }

    const changeAllFilter = () => {
        props.changeFilter('all' )
    }

    const changeActiveFilter = () => {
        props.changeFilter('active' )
    }

    const changeCompletedFilter = () => {
        props.changeFilter('completed' )
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    const removeTask = () => {
                        props.removeTask(el.id)
                    }

                    return <li
                        key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                        <button onClick={removeTask}>XXX</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={changeAllFilter}>All</button>
                <button onClick={changeActiveFilter}>Active</button>
                <button onClick={changeCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}