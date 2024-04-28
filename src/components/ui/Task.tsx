import { CiCalendar, CiEdit } from "react-icons/ci"
import { TiTickOutline } from "react-icons/ti";
import Tags from "./tags"
import { useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { tagType, TaskType } from "@/Types/task-types";
import { getDateString } from "@/utils/functions";
import { useDeleteTaskMutation, useNewTaskMutation, useUpdateTaskMutation } from "@/redux/api/taskApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";




export type PropsType = TaskType & {
    isNew: boolean,
}





const Task = ({ msg, date, tags, _id, isFinished, isNew }: PropsType) => {


    const { token } = useSelector((state: RootState) => state.userSlice);
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const [newTask] = useNewTaskMutation();




    const [data, setData] = useState<TaskType>({
        _id: _id,
        msg: msg,
        date: date,
        tags: tags,
        isFinished: isFinished,
    })

    const dateInputRef = useRef<HTMLInputElement>(null);
    const [tag, setTag] = useState<tagType>({
        msg: "",
    });
    const [isCompleted, setIsCompleted] = useState<boolean>(isFinished);
    const [isEditing, setIsEditing] = useState<boolean>(isNew);

    const formatedDate = getDateString(new Date(data.date));


    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (!tag ) return;
        const len = data.tags.length;
        if (len > 5) return;


        setData(prev => ({
            ...prev,
            tags: [
                ...prev.tags,
                {
                    _id: tag._id,
                    msg: tag.msg,
                }
            ]
        }));
        setTag({
            msg: "",
        });
    }


    const updateHandler = async () => {
        setIsEditing(prev => !prev);

        if (!isNew) {

            await updateTask({
                taskId: data._id,
                token: token!.access_token,
                task: {
                    msg: data.msg,
                    date: data.date,
                    tags: data.tags,
                    isFinished: isCompleted ? "true" : "false",
                }
            });
        }
        else{
            await newTask({
                token: token!.access_token,
                task: {
                    _id: uuidv4() as string,
                    msg: data.msg,
                    date: data.date,
                    tags: data.tags,
                }
            });
        }


    }

    const checkboxHandler = async () => {
        const updated = !isCompleted;
        setIsCompleted(prev => !prev);
        await updateTask({
            taskId: data._id,
            token: token!.access_token,
            task: {
                msg: data.msg,
                date: data.date,
                tags: data.tags,
                isFinished: updated ? "true" : "false",
            }
        });
    }

    const deleteHandler = async () => {

        await deleteTask({
            taskId: data._id,
            token: token!.access_token
        });

    }


    return (

        <div className="border border-white  rounded-md px-6 py-4 grid grid-cols-12 gap-3">
            <input
                type="checkbox"
                className="w-6 h-6 outline-none checked:text-violet-500"
                checked={isCompleted}
                onChange={() => { checkboxHandler() }}
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
                {isEditing ? !isCompleted &&
                    <button onClick={updateHandler}>
                        <TiTickOutline className="text-xl" />
                    </button>

                    : !isCompleted && <button onClick={() => { setIsEditing(prev => !prev) }}> <CiEdit className="text-lg" />
                    </button>

                }
            </div>

            {!isCompleted &&
                <>
                    <div className="col-start-2 col-end-12" onClick={() => dateInputRef.current?.click()}>
                        {isEditing && <input
                            type="date"
                            ref={dateInputRef}
                            className="outline-none subtitle bg-primary-200"
                            // value={data.date.toISOString().slice(0, 10)}
                            onChange={(e) => setData(prev => ({ ...prev, date: new Date(e.target.value) }))}
                        />
                        }
                        {!isEditing &&
                            <div className="flex items-center gap-2"><CiCalendar className="text-orange-400 " /><p className="text-orange-400 text-sm">{formatedDate}</p></div>
                        }
                    </div>
                    {!isEditing &&
                        <div className="col-start-2 col-end-12 flex gap-4">
                            {data.tags.map(tag => <Tags key={tag._id} msg={tag.msg} />)}
                        </div>
                    }
                    {isEditing &&
                        <div className="mt-4 col-start-2 col-end-12 border-b flex gap-2 py-1">
                            {data.tags.map(tag => <Tags
                                key={tag._id}
                                onClick={() => setData(prev => ({ ...prev, tags: prev.tags.filter(t => t._id !== tag._id) }))}
                                msg={tag.msg}
                            />
                            )}
                            <input
                                className="outline-none bg-primary-200"
                                type="text"
                                onKeyPress={(e) => e.key === 'Enter' ? submitHandler(e) : null}
                                value={tag?.msg}
                                onChange={(e) => setTag({
                                    msg: e.target.value,
                                    _id: `${uuidv4()}`
                                })}
                            />

                        </div>
                    }
                </>

            }
        </div>

    )
}

export default Task
