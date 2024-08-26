import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {Button} from "../components/Button";
import {log} from "node:util";

export type ListPropsType = {
    id: string;
    title: string;
    isDone: boolean;
}

type TodoListPropsType = {
    tasks: ListPropsType[];
    addTask: (title: string) => void;
    removeTask: (id: string) => void;
    changeTask: (id: string, isDine: boolean) => void;
}

export const TodoList = ({tasks, removeTask, addTask, changeTask}: TodoListPropsType) => {
    let [filterValue, setFilterValue] = useState<string>('all');
    let [inputValue, setInputValue] = useState<string>('');
    let [inputError, setInputError] = useState<boolean>(false);

// Get task fn
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputError(false)
        setInputValue(event.currentTarget.value.trim())
    }


// Add task fn
    const onClickButtonHandler = () => {
        if (inputValue) {
            addTask(inputValue);
            setInputValue('');
        } else {
            setInputError(true)
        }
    }

//  Filtering using buttons
    let filteredTasks = [...tasks]

    const filterTodoList = (event: MouseEvent<HTMLButtonElement>) => {
        setFilterValue(event.currentTarget.value.toLowerCase());
    }

    if (filterValue === 'completed') {
        filteredTasks = tasks.filter((task) => task.isDone)
    }
    if (filterValue === 'active') {
        filteredTasks = tasks.filter((task) => !task.isDone)
    }

// Drawing list items

    const createList = filteredTasks.map((task) => {

        const onClickButtonHandler = () => {
            removeTask(task.id)
        };

        // Change task fn
        const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            changeTask(task.id, event.currentTarget.checked)
        }

        return (
            <li key={task.id}>
                <label>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={inputChangeHandler}/>
                    <span>{task.title}</span>
                </label>
                <Button
                    title={'Delete'}
                    callBack={onClickButtonHandler}
                    className={'delete'}/>
            </li>
        )
    })

    return (
        <div>
            <h3></h3>
            {/*Add form*/}
            <form>
                <input
                    value={inputValue}
                    type="text"
                    onChange={onChangeInputHandler}
                    className={inputError ? 'error' : ''}
                />
                <Button
                    title={'Add task'}
                    callBack={onClickButtonHandler}
                    className={'add'}
                />
            </form>

            {inputError && <span className={'error-message'}>Title is required</span>}
            {
                !filteredTasks.length ?
                    <h3>TodoList is empty</h3> :
                    <ul className={'todoList'}>
                        {createList}
                    </ul>
            }

            {/*Filter Buttons*/}
            <ul className={'buttonsList'}>
                <li>
                    <button
                        onClick={filterTodoList}
                        value={'all'}
                    >All
                    </button>
                </li>
                <li>
                    <button
                        onClick={filterTodoList}
                        value={'active'}
                    >Active
                    </button>
                </li>
                <li>
                    <button
                        onClick={filterTodoList}
                        value={'completed'}
                    >Completed
                    </button>
                </li>
            </ul>

        </div>
    )
        ;
};


// export type TasksType = {
//     id: string;
//     title: string;
//     isDone: boolean;
// }
//
// type TodoListType = {
//     title: string;
//     todoList: TasksType[];
//     addTask: (value: string) => void;
//     removeTask: (id: string) => void;
//     changeTask: (value: TasksType[]) => void;
//
// }
//
// export const TodoList = ({title, todoList, addTask, removeTask, changeTask}: TodoListType) => {
//     const [value, setValue] = useState<string>('all');
//     let [error, setError] = useState<boolean>(false);
//
// // Get input value
//     const [inputValue, setInputValue] = useState('');
//
//     const getInputValue = (event: ChangeEvent<HTMLInputElement>) => {
//         setInputValue(event.currentTarget.value)
//         setError(false)
//     }
//
// // Add task fn
//     const addTodo = (event: MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//         if(!inputValue.trim()) {
//             setError(true)
//             return;
//         }
//         addTask(inputValue)
//         setInputValue('')}
//
// //  Filtering using buttons
//
//     const filterTask = (event: MouseEvent<HTMLButtonElement>) => {
//         setValue(event.currentTarget.value)
//     }
//     let filteredTasks: TasksType[] = todoList
//
//     if (value === 'completed') {
//         filteredTasks = todoList.filter(task => task.isDone === true)
//     }
//     if (value === 'active') {
//         filteredTasks = todoList.filter(task => task.isDone === false)
//     }
//
// // Drawing list items
//
//     const todoListItems = filteredTasks.map((task: TasksType) => {
//
//         const checkedTask = (event: ChangeEvent<HTMLInputElement>) => {
//
//             let task = filteredTasks.find((task) => task.id === event.currentTarget.id);
//
//             if (task) {
//                 task.isDone = !task.isDone
//             }
//
//             changeTask([...todoList])
//
//         }
//         return (
//             <li key={task.id} className={task.isDone ? 'is-done' : ''}>
//                 <label>
//                     <input
//                         id={task.id}
//                         type="checkbox"
//                         checked={task.isDone}
//                         onChange={checkedTask}
//                     />
//                     <span>{task.title}</span>
//                 </label>
//                 <button
//                     className={'delete'}
//                     onClick={() => removeTask(task.id)}
//                 >
//                     Delete
//                 </button>
//
//             </li>
//         )
//     })
//
//
//     return (
//         <div>
//             <h3>{title}</h3>
//             {/*Add form*/}
//             <form>
//                 <input
//                     className = {error ? 'error' : ''}
//                     value={inputValue}
//                     onChange={getInputValue}
//                     type="text"
//                 />
//
//                 <button
//                     className={'add'}
//                     onClick={addTodo}
//                 >Add task
//                 </button>
//                 {error && <div className={'error-message'}>Input filed is empty.</div>}
//             </form>
//             {/*Todo List*/}
//             {!filteredTasks.length ?
//                 <h2>TodoList is empty.</h2> :
//                 <ul className={'todoList'}>
//                     {todoListItems}
//                 </ul>}
//             {/*Filter Buttons*/}
//             <ul className={'buttonsList'}>
//                 <li>
//                     <button className={ value === 'all' ? 'active-button' : ''} onClick={filterTask} value={'all'}>All</button>
//                 </li>
//                 <li>
//                     <button className={ value === 'active' ? 'active-button' : ''} onClick={filterTask} value={'active'}>Active</button>
//                 </li>
//                 <li>
//                     <button className={ value === 'completed' ? 'active-button' : ''} onClick={filterTask} value={'completed'}>Completed</button>
//                 </li>
//             </ul>
//
//         </div>
//     )
//         ;
// };