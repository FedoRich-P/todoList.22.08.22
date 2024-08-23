import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
// import {ButtonsValueType} from "../App";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

type TodoListType = {
    title: string;
    todoList: TasksType[];
    addTask: (value: string) => void;
    removeTask: (id: string) => void;
    changeTask: (value: TasksType[]) => void;

}

export const TodoList = ({title, todoList, addTask, removeTask, changeTask}: TodoListType) => {
    const [value, setValue] = useState<string>('all');
    let [error, setError] = useState<boolean>(false);

// Get input value
    const [inputValue, setInputValue] = useState('');

    const getInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError(false)
    }

// Add task fn
    const addTodo = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(!inputValue.trim()) {
            setError(true)
            return;
        }
        addTask(inputValue)
        setInputValue('')}

//  Filtering using buttons

    const filterTask = (event: MouseEvent<HTMLButtonElement>) => {
        setValue(event.currentTarget.value)
    }
    let filteredTasks: TasksType[] = todoList

    if (value === 'completed') {
        filteredTasks = todoList.filter(task => task.isDone === true)
    }
    if (value === 'active') {
        filteredTasks = todoList.filter(task => task.isDone === false)
    }

// Drawing list items

    const todoListItems = filteredTasks.map((task: TasksType) => {

        const checkedTask = (event: ChangeEvent<HTMLInputElement>) => {

            let task = filteredTasks.find((task) => task.id === event.currentTarget.id);

            if (task) {
                task.isDone = !task.isDone
            }

            changeTask([...todoList])

        }
        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <label>
                    <input
                        id={task.id}
                        type="checkbox"
                        checked={task.isDone}
                        onChange={checkedTask}
                    />
                    <span>{task.title}</span>
                </label>
                <button
                    className={'delete'}
                    onClick={() => removeTask(task.id)}
                >
                    Delete
                </button>

            </li>
        )
    })


    return (
        <div>
            <h3>{title}</h3>
            {/*Add form*/}
            <form>
                <input
                    className = {error ? 'error' : ''}
                    value={inputValue}
                    onChange={getInputValue}
                    type="text"
                />

                <button
                    className={'add'}
                    onClick={addTodo}
                >Add task
                </button>
                {error && <div className={'error-message'}>Input filed is empty.</div>}
            </form>
            {/*Todo List*/}
            {!filteredTasks.length ?
                <h2>TodoList is empty.</h2> :
                <ul className={'todoList'}>
                    {todoListItems}
                </ul>}
            {/*Filter Buttons*/}
            <ul className={'buttonsList'}>
                <li>
                    <button className={ value === 'all' ? 'active-button' : ''} onClick={filterTask} value={'all'}>All</button>
                </li>
                <li>
                    <button className={ value === 'active' ? 'active-button' : ''} onClick={filterTask} value={'active'}>Active</button>
                </li>
                <li>
                    <button className={ value === 'completed' ? 'active-button' : ''} onClick={filterTask} value={'completed'}>Completed</button>
                </li>
            </ul>

        </div>
    )
        ;
};

