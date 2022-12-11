import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../Todolist/TodoList.module.css";
import {Button} from "../Button/Button";

type AddTodoList = {
    addItem:(title: string)=>void
}

export const AddItemForm = (props:AddTodoList) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    return(
        <div>
            <input className={error ? s.error : ''} value={title} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button name={'+'} callBack={addTask}/>
            {error &&  <div className={s.errorMessage}>Title is required</div>}
        </div>
    )
}