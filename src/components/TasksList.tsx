import Task from "./ui/Task"


const TasksList = () => {



    return (
        <div className="flex flex-col gap-4">
            <Task
                msg="Finish Onboarding"
                date={new Date(Date.now() + 172800000).toISOString()}
                tags={
                    [
                        {
                            id: "1",
                            msg: "LaunchPad",
                            variant: "violet",
                        },
                        {
                            id: "2",
                            msg: "Dabble",
                            variant: "red",
                        }
                    ]
                } />
            <Task
                msg="Complete your task"
                date={new Date(Date.now() + 87289900).toISOString()}
                tags={
                    [
                        {
                            id: "1",
                            msg: "Joining",
                            variant: "orange",
                        },
                        {
                            id: "2",
                            msg: "Furios",
                            variant: "blue",
                        }
                    ]
                } />
            <Task
                msg="Finish Onboarding"
                date={new Date(Date.now()).toISOString()}
                tags={
                    [
                        {
                            id: "1",
                            msg: "Begining",
                            variant: "red",
                        },
                        {
                            id: "2",
                            msg: "Fast",
                            variant: "green",
                        }
                    ]
                } />
        </div>

    )
}

export default TasksList