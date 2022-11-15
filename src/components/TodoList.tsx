import React from "react";
import {FilterValueType, TaskType} from "../App";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number)=>void
    changeFilter:(value: FilterValueType)=>void
}

export const TodoList = (props: TodoListPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return <li
                        key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                        <button onClick={()=>props.removeTask(el.id)}>XXX</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}