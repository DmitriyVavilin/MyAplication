import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddTodolist/AddItemForm";
import {TodoList} from "./components/Todolist/TodoList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const removeTask = (taskId: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        const filterTasks = tasks.filter((el) => el.id !== taskId)
        tasksObj[todoListId] = filterTasks
        setTasks({...tasksObj})
    }
    const removeTodolist = (todoListId: string) => {
        const filteredTodoList = todoLists.filter(el => el.id !== todoListId)
        setTodolists([...filteredTodoList])
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }
    const changeFilter = (value: FilterValueType, todoListId: string) => {
        let todoList = todoLists.find(el => el.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodolists([...todoLists])
        }
    }
    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title: title, isDone: true}
        let tasks = tasksObj[todoListId]
        let newTask = [task, ...tasks]
        tasksObj[todoListId] = newTask
        setTasks({...tasksObj})
    }

    const onChangeCheckBox = (taskId: string, eventValue: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(el => el.id === taskId)

        if(task) {
            task.isDone = eventValue
            setTasks({...tasksObj})
        }
    }
    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todoLists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Graph Ql", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
        ]
    })

    const addTodoList = (title: string) => {
        let todoList: TodoListType = {id: v1(), title: title, filter: 'all'}
        setTodolists([todoList, ...todoLists])
        setTasks({...tasksObj, [todoList.id]: []})
    }

    return (
        <div className="App">
            <AddItemForm  addItem={addTodoList}/>
            {todoLists.map((tl) => {
                let tasksForTodolist = tasksObj[tl.id]

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter((el) => !el.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter((el) => el.isDone)
                }
                return (
                    <TodoList
                        removeTodolist={removeTodolist}
                        key={tl.id}
                        title={tl.title}
                        id={tl.id}
                        filter={tl.filter}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        onChangeCheckBox={onChangeCheckBox}
                    />)
            })}
        </div>
    );
}

export default App;
