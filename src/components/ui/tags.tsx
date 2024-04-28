import { tagType } from "@/Types/task-types";
import { useMemo } from "react";




function randomVariant() {
    const variants = ["violet", "red", "green", "orange", "blue"];
    return variants[Math.floor(Math.random() * variants.length)];
}


const Tags = ({msg, onClick} : tagType) => {

    const variant = useMemo(()=>randomVariant(),[]);

    let bgColor;
    let textColor;
    let dotColor;
    if(variant == 'violet') {
        bgColor = 'bg-violet-200'
        textColor = 'text-violet-500'
        dotColor = 'bg-violet-500'
    }
    if(variant == 'red') {
        bgColor = 'bg-red-200'
        textColor = 'text-red-500'
        dotColor = 'bg-red-500'
    }
    if(variant == 'green') {
        bgColor = 'bg-green-200'
        textColor = 'text-green-500'
        dotColor = 'bg-green-500'
    }
    if(variant == 'orange') {
        bgColor = 'bg-orange-200'
        textColor = 'text-orange-500'
        dotColor = 'bg-orange-500'
    }
    if(variant == 'blue') {
        bgColor = 'bg-blue-200'
        textColor = 'text-blue-500'
        dotColor = 'bg-blue-500'
    }


    
    return (
        <div 
            onClick={onClick ? onClick : undefined}
            className={`${bgColor} ${textColor} flex items-center gap-2 rounded-md px-2 max-w-max `}
        >
            <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
            {msg}
        </div>
    )
}

export default Tags