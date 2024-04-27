import TasksList from "@/components/TasksList"

const home = () => {
    return (
        <div className="main-section px-20 py-4 flex flex-col gap-4">
            <h1 className="title mb-4">Tasks</h1>
            <div className="h-[0.2px] w-full bg-white"></div>
            <div className="mb-10">
                <button className="bg-violet-400 text-white px-3 py-1 rounded-lg">+ New Task</button>
            </div>
            <TasksList />
        </div>
    )
}

export default home