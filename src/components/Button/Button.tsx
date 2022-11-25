import React from "react";
import s from '../Todolist/TodoList.module.css'
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

    const classBtn = props.name.toLowerCase() === props.filterValue ? s.activeFilter : '';
    return(
        <button className={classBtn} onClick={onclickHandler}>{props.name}</button>
    )
}