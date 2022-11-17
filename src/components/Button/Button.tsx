import React from "react";
import style from '../Todolist/TodoList.module.css'
import {FilterValueType} from "../../App";

type ButtonType = {
    name: string
    filterValue?: FilterValueType
    callBack: ()=>void
}

export const Button = (props: ButtonType) => {

    const onclickHandler = () => {
        props.callBack()
    }

    const classBtn = props.name.toLowerCase() === props.filterValue ? style.activeFilter : '';

    return(
        <button className={classBtn} onClick={onclickHandler}>{props.name}</button>
    )
}