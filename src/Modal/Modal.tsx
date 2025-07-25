import './Modal.css'
import * as React from "react";
import IconClose from "../Icons/IconClose.tsx";
import dayjs from "dayjs";
import {useState} from "react";
import {V8Proxy} from "../lib/react-1cv8-web-app-main";
import type {ITask} from "../model.ts";

interface IProps {
    active: boolean
    setActive: (active: boolean) => void
    setListTasks: (tasks: ITask[]) => void
}

const Modal: React.FC<IProps> = ({active, setActive, setListTasks}) => {
    const [name, setName] = useState<string>("")

    const onCreateDoc = async () => {
        await V8Proxy.fetch('СоздатьЗадачу', { name });
        await V8Proxy.fetch('ПолучитьСписокЗадач').then((res) => {
            setListTasks(res.json())
        })
        setActive(false);
        setName('');
    }

    return (
        <div className={active ? "modal active" : "modal"}>
            <div className={active ? "modal-content active" : "modal-content"} onClick={e => e.stopPropagation()}>
                <div className="close" onClick={() => setActive(false)}>
                    <IconClose />
                </div>
                <h1>Новая задача</h1>
                <div className="form">
                    <div style={{marginBottom: '20px'}}>
                        {dayjs().format('DD.MM.YYYY HH:mm:ss')}
                    </div>
                    <div>
                        <input value={name} className="input" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="modal-buttons">
                        <button className="button button-close"  onClick={() => setActive(false)}>Отмена</button>
                        <button className="button" onClick={onCreateDoc}>Создать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;