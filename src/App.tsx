import './App.css';
import {TodoList, ListPropsType} from "./layout/TodoList";
import {v1} from "uuid";
import {useState} from "react";

// export type ButtonsValueType = 'all' | 'completed' | 'active'

function App() {

    const todoList: ListPropsType[] = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Angular', isDone: false},
        {id: v1(), title: 'Vue', isDone: false},
    ]

    const [tasks, setTasks] = useState<ListPropsType[]>(todoList);

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter((todo) => todo.id !== id))
    }

    const changeTask = (id: string, isDone: boolean) => {
        const newState = tasks.map(task => {
            if (task.id === id) {
                task.isDone = !task.isDone
            }
            return task;
        })
        setTasks(newState)
    }

    return (
        <>
            <h1>TodoList</h1>
            <div className='App'>
                <TodoList
                    tasks={tasks}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTask={changeTask}
                />
            </div>
        </>
    );
}

export default App;


// const [task, setTask] = useState<TasksType[]>([...todoList]);
//
// const addTask = (value: string) => {
//     setTask([{id: v1(), title: value, isDone: false}, ...task])
// }
//
// const removeTask = (id: string) => {
//     setTask(task.filter(task => task.id !== id))
// }
//
// const changeTask = (value: TasksType[]) => {
//     setTask(value)
// }
//
// return (
//     <>
//         <h1>TodoList</h1>
//         <div className='App'>
//             <TodoList
//                 title={'What to learn'}
//                 todoList={task}
//                 addTask={addTask}
//                 removeTask={removeTask}
//                 changeTask={changeTask}
//             />
//         </div>
//     </>
// );