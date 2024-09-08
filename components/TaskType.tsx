import { MdHistoryEdu } from "react-icons/md";
import { FaBug } from "react-icons/fa6";

const TaskType = ({taskType} : {taskType: string}) => {
    const bgColor = () => {
        if(taskType == "Story") {
            return "bg-[#79F839]"
        }else if(taskType == "Bug") {
            return "bg-[#FFCC24]"
        }
    }
    return(
        <>
            <div className={`flex ${bgColor()} w-[95%] px-2 h-fit py-2 rounded-md drop-shadow-xl justify-center items-center text-black gap-2`}>
                {taskType == "Story" && <MdHistoryEdu size={24}/>}
                {taskType == "Bug" && <FaBug size={24}/>}
                <p className="items-center justify-center text-xl font-semibold">{taskType}</p>
            </div>
        </>
    )
}

export default TaskType;