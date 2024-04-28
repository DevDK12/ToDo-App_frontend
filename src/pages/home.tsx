import Task, { PropsType } from "@/components/ui/Task"
import { useState } from "react"
import {v4 as uuidv4} from 'uuid';

const Home = () => {

    const [tasks, setTasks] = useState<PropsType[]>([

    ])



    return (
        <div className="main-section px-20 py-4 flex flex-col gap-4">
            <h1 className="title mb-4">Tasks</h1>
            <div className="h-[0.2px] w-full bg-white"></div>
            <div className="mb-10">
                <button
                    className="bg-violet-400 text-white px-3 py-1 rounded-lg"
                    onClick={() => setTasks(prev => (
                        [{
                            _id: `${uuidv4()}`,
                            msg: "New Task",
                            date: new Date(Date.now()),
                            isFinished: false,
                            tags: [],
                            isNew: true,
                        },
                        ...prev
                        ]
                    ) ) }
                >+ New Task</button>
            </div>

            <div className="flex flex-col gap-4">
                {tasks.map(task => {
                    return (
                        <Task
                            key={task._id}
                            _id={task._id}
                            isFinished={task.isFinished}
                            msg={task.msg}
                            date={task.date}
                            tags={task.tags}
                            isNew={task.isNew}
                        />
                    )
                })}

            </div>
        </div>
    )
}

export default Home