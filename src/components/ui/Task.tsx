import { CiCalendar, CiEdit } from "react-icons/ci"
import { TiTickOutline } from "react-icons/ti";
import Tags from "./tags"
import { useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from "@/Types/task-types";
import { getDateString } from "@/utils/functions";




export type PropsType = TaskType & {
    isNew: boolean,
}





const Task = ({msg, date, tags, _id, isFinished, isNew} : PropsType) => {

    const [data, setData] = useState<TaskType>({
        _id: _id,
        msg: msg,
        date: date,
        tags: tags,
        isFinished: isFinished,
    })

    const dateInputRef = useRef<HTMLInputElement>(null);
    const [tag, setTag] = useState<string>("");
    const [isCompleted, setIsCompleted] = useState<boolean>(isFinished);
    const [isEditing, setIsEditing] = useState<boolean>(isNew);

    const formatedDate = getDateString(new Date(data.date));


    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (!tag || tag === "") return;
        const len = data.tags.length;
        if (len > 5) return;


        setData(prev => ({
            ...prev,
            tags: [
                ...prev.tags,
                {
                    id: `${uuidv4()}`,
                    msg: tag,
                }
            ]
        }));
        setTag("");
    }


    return (

        <div className="border border-white  rounded-md px-6 py-4 grid grid-cols-12 gap-3">
            <input
                type="checkbox"
                className="w-6 h-6 outline-none checked:text-violet-500"
                checked={isCompleted}
                onChange={() => { setIsCompleted(prev => !prev) }}
            />


            <div className="col-start-2 col-end-11 flex gap-4">
                {isEditing ?
                    <input
                        type="text"
                        value={data.msg}
                        onChange={(e) => setData(prev => ({ ...prev, msg: e.target.value }))}
                        className="outline-none subtitle bg-primary-200 border-b"
                    /> :
                    <h2 className={`subtitle ${isCompleted ? 'line-through' : ''}`}>{data.msg} </h2>
                }
                <button onClick={() => { setIsEditing(prev => !prev) }}>
                    {isEditing ? !isCompleted && <TiTickOutline className="text-xl" /> : !isCompleted && <CiEdit className="text-lg" />}
                </button>
            </div>

            {!isCompleted &&
                <>
                    <div className="col-start-2 col-end-12" onClick={() => dateInputRef.current?.click()}>
                        {isEditing && <input
                            type="date"
                            ref={dateInputRef}
                            className="outline-none subtitle bg-primary-200"
                            value={data.date.toISOString().slice(0, 10)}
                            onChange={(e) => setData(prev => ({ ...prev, date: new Date(e.target.value)}))}
                        />
                        }
                        {!isEditing &&
                            <div className="flex items-center gap-2"><CiCalendar className="text-orange-400 " /><p className="text-orange-400 text-sm">{formatedDate}</p></div>
                        }
                    </div>
                    {!isEditing &&
                        <div className="col-start-2 col-end-12 flex gap-4">
                            {data.tags.map(tag => <Tags key={tag.id} msg={tag.msg} />)}
                        </div>
                    }
                    {isEditing &&
                        <div className="mt-4 col-start-2 col-end-12 border-b flex gap-2 py-1">
                            {data.tags.map(tag => <Tags 
                                key={tag.id} 
                                onClick={() => setData(prev => ({...prev, tags: prev.tags.filter(t => t.id !== tag.id)}))}
                                msg={tag.msg} 
                            />
                            )}
                            <input
                                className="outline-none bg-primary-200"
                                type="text"
                                onKeyPress={(e) =>  e.key === 'Enter' ? submitHandler(e) : null}
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />

                        </div>
                    }
                </>

            }
        </div>

    )
}

export default Task
