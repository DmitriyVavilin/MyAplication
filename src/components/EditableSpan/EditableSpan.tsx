import React from "react";

type EditableSpanPropsType = {
    title: string
    editMode: boolean
}

export function EditableSpan(props: EditableSpanPropsType) {
    return (
        props.editMode
            ? <input value={props.title}/>
            : <span>{props.title}</span>
    )
}
