import { FaGear } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

const TaskStatus = ({ status} : {status: string}) => {
    const bgColor = () => {
        if(status == "Completed") {
            return "bg-[#7EFE40]"
        } else if (status == "In Progress") {
            return "bg-[#FF8C00]"
        } else if (status == "Not Started") {
            return "bg-[#BEBEBF]"
        }
    }

    return(
        <>
        <div className={`flex ${bgColor()} w-[95%] px-2 h-fit pt-1 items-center justify-center rounded-md drop-shadow-xl text-white`}>
            {status == "In Progress" && <FaGear size={24}/>}
            {status == "Completed" && <FaCheck size={24}/>}
            {status == "Not Started" && <RxCross1 size={24}/>}
            <p className="p-3 items-center justify-center text-xl font-semibold">{status}</p>
        </div>
        </>
    )
}

export default TaskStatus;