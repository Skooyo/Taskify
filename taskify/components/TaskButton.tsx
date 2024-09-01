import Link from 'next/link'
import { FaPlus } from "react-icons/fa";

const TaskButton = () => {
    return(
        <>
        <div className="bg-[#FFD400] rounded-lg">
            <button
                type="button"
                className="p-2 rounded-lg border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2"
                >

                <FaPlus />
                <p>Add Card</p>

            </button>
        </div>
        </>
    )
}

export default TaskButton