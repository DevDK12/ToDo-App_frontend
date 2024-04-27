import { CiCalendar } from "react-icons/ci"
import Tags, { tagType } from "./tags"
import { useState } from "react"




const getDateString = (dateStr: string) => {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    });
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    });
    const date = new Date(dateStr);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    }).format(date);
    if (today === formattedDate) return 'Today';
    if (tomorrow === formattedDate) return 'Tomorrow';
    return `${formattedDate.slice(0, 3)} ${formattedDate.slice(7)}`;
}


type PropsType = {
    msg: string,
    date: string,
    tags: tagType[]
}


const Task = ({ msg, date, tags }: PropsType) => {

    const [isFinished, setIsFinished] = useState<boolean>(false);

    const formatedDate = getDateString(date);


    return (

        <div className="border border-white  rounded-md px-6 py-4 grid grid-cols-12 gap-3">
            <input
                type="checkbox"
                className="w-6 h-6 outline-none checked:text-violet-500"
                onClick={() => { setIsFinished(prev => !prev) }}
            />
            <h2 className={`subtitle col-start-2 col-end-12 ${isFinished ? 'line-through' : ''}`}>{msg}</h2>
            {!isFinished &&
                <>
                    <div className="flex items-center gap-2 col-start-2 col-end-12"><CiCalendar className="text-orange-400 " /><p className="text-orange-400 text-sm">{formatedDate}</p></div>
                    <div className="col-start-2 col-end-12 flex gap-3">
                        {tags.map(tag => {
                            return (
                                <Tags
                                    key={tag.msg}
                                    msg={tag.msg}
                                    variant={tag.variant}
                                />
                            );
                        })}

                    </div>
                </>
            }
        </div>
    )
}

export default Task