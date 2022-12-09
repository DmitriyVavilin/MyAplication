import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValueType, TaskType} from "../../App";
import {Button} from "../Button/Button";
import s from './TodoList.module.css'
import {AddItemForm} from "../AddTodolist/AddItemForm";


type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValueType
    removeTask: (taskId: string, todoListId: string)=>void
    changeFilter:(value: FilterValueType, todoListId: string)=>void
    addTask:(title: string, todoListId: string)=>void
    onChangeCheckBox: (taskId: string,eventValue: boolean, todoListId: string)=>void
    removeTodolist:(todoListId: string)=>void
}

export const TodoList = (props: TodoListPropsType) => {

    const removeTaskHandler = (tId: string) => { // Второе решение
        props.removeTask(tId, props.id)
    }

    const changeFilterHandler = (filterValue: FilterValueType) => {
        props.changeFilter(filterValue, props.id)
    }

    const onChangeCheckBoxHandler = (tId: string,eventValue: boolean) => {
        props.onChangeCheckBox(tId,eventValue, props.id)
    }

    const removeTodolistHandler = (todoListId: string) => {
        props.removeTodolist(todoListId)
    }


    return (
        <div>
            <h3>{props.title} <button onClick={()=>removeTodolistHandler(props.id)}>xxx</button></h3>
            <AddItemForm id={props.id} addTask={props.addTask}/>
            <ul>
                {props.tasks.map((el) => {
                    // const removeTaskHandler = () => {  // Первое решение
                    //     props.removeTask(el.id)
                    // }

                    return <li className={el.isDone ? s.isDone : ''}
                        key={el.id}>
                        <input type="checkbox" checked={el.isDone}
                               onChange={(event)=>onChangeCheckBoxHandler(el.id, event.currentTarget.checked)}/> <span>{el.title}</span>
                        <Button name={'XXX'} callBack={()=>removeTaskHandler(el.id)}/>
                    </li>
                })}
            </ul>
            <div >
                <Button filterValue={props.filter} name={'All'} callBack={()=>changeFilterHandler('all')}/>
                <Button filterValue={props.filter} name={'Active'} callBack={()=>changeFilterHandler('active')}/>
                <Button filterValue={props.filter} name={'Completed'} callBack={()=>changeFilterHandler('completed')}/>
            </div>
        </div>
    )
}