import './App.css'
import type {ITask} from "./model.ts";
import IconComplete from "./Icons/IconComplete.tsx";
import IconTrash from "./Icons/IconTrash.tsx";
import Modal from "./Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {V8WebAppProvider, V8Proxy} from './lib/react-1cv8-web-app-main'
import IconStop from "./Icons/IconStop.tsx";

function App() {
    const [active, setActive] = useState<boolean>(false)
    const [listTasks, setListTasks] = useState<ITask[]>([])

    useEffect(() => {
        V8Proxy.fetch('ПолучитьСписокЗадач').then((res) => {
            setListTasks(res._value ? res.json() : [])
        })
    }, []);

    const onDeleteDoc = async (number: string) => {
        await V8Proxy.fetch('УдалитьЗадачу', { number });
        await V8Proxy.fetch('ПолучитьСписокЗадач').then((res) => {
            setListTasks(res._value ? res.json() : [])
        })
    }

    const onCompleteDoc = async (number: string) => {
        await V8Proxy.fetch('ПровестиЗадачу', { number });
        await V8Proxy.fetch('ПолучитьСписокЗадач').then((res) => {
            setListTasks(res.json())
        })
    }

    return (
        <V8WebAppProvider>
            <h1>Список задач</h1>
            <div className="buttons">
                <button className="button" onClick={() => setActive(true)}>Создать задачу</button>
            </div>
            <div className="list-tasks">
                {
                    listTasks.length > 0  ? listTasks.map((item) => <div className="task" key={item["Номер"]}>
                        <div className="task-name-date">
                            <div className={item["Проведен"] ? "task-name task-name-completed" : "task-name"}>{item["Название"]}</div>
                            <div className="task-date">{item["Дата"]}</div>
                        </div>
                        <div className="icons">
                            <div onClick={()=> onCompleteDoc(item["Номер"])}>{item["Проведен"] ? <IconComplete/> : <IconStop/>}</div>
                            <div onClick={()=> onDeleteDoc(item["Номер"])}>
                                <IconTrash/>
                            </div>
                        </div>
                    </div>) : <>Задач нет</>
                }
            </div>
            <Modal active={active} setActive={setActive} setListTasks={setListTasks}/>
        </V8WebAppProvider>
    )
}

export default App
