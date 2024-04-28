import Task, { PropsType } from "@/components/ui/Task"
import { useGetAllTasksQuery } from "@/redux/api/taskApi";
import { RootState } from "@/redux/store";
import { TaskType } from "@/Types/task-types";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {


    const { token } = useSelector((state: RootState) => state.userSlice);

    const { data, isLoading, isError, error, isSuccess } = useGetAllTasksQuery(token!.access_token);



    const [tasks, setTasks] = useState<PropsType[]>([]);


    useEffect(() => {
        if (isSuccess && data) {
            setTasks(data.data.tasks.map((task: TaskType) => ({
                ...task,
                isNew: false
            })));
        }
    }, [isSuccess, data])



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
                    ))}
                >+ New Task</button>
            </div>

            {isLoading && <p>Loading Tasks...</p>}
            {isError && <p>{(error as Error).message}</p>}
            <div className="flex flex-col gap-4  md:w-2/3 lg:w-3/5 xl:w-1/2 mx-auto h-[400px]">
                {isSuccess && tasks.length === 0 && <div className="w-full h-full grid place-items-center"><p>No task created </p> </div>}
                {isSuccess &&
                    tasks.map(task => {
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
                    })
                }
            </div>
        </div>
    )
}

export default Home