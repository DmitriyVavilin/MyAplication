import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValueType, TaskType} from "../App";
import {Button} from "./Button/Button";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string)=>void
    changeFilter:(value: FilterValueType)=>void
    addTask:(title: string)=>void
    onChangeCheckBox: (taskId: string,eventValue: boolean )=>void
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

    const removeTaskHandler = (tId: string) => { // Второе решение
        props.removeTask(tId)
    }

    const changeFilter = (filterValue: FilterValueType) => {
        props.changeFilter(filterValue)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <Button name={'+'} callBack={addTask}/>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    // const removeTaskHandler = () => {  // Первое решение
                    //     props.removeTask(el.id)
                    // }

                    const onChangeCheckBoxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.onChangeCheckBox(el.id,event.currentTarget.checked)
                    }


                    return <li
                        key={el.id}>
                        <input type="checkbox" checked={el.isDone}
                               onChange={onChangeCheckBoxHandler}/> <span>{el.title}</span>
                        <Button name={'XXX'} callBack={()=>removeTaskHandler(el.id)}/>
                    </li>
                })}
            </ul>
            <div>
                <Button name={'All'} callBack={()=>changeFilter('all')}/>
                <Button name={'Active'} callBack={()=>changeFilter('active')}/>
                <Button name={'Completed'} callBack={()=>changeFilter('completed')}/>
            </div>
        </div>
    )
}