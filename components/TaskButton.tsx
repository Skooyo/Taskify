import Link from 'next/link'
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import CreateForm from './CreateForm';

const TaskButton = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    return(
        <>
        <CreateForm isOpen={createModalOpen} setIsOpen={setCreateModalOpen} />
        <div className="bg-[#FFD400] rounded-lg drop-shadow-xl">
            <button
                type="button"
                className="p-2 rounded-lg border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2"
                onClick = {() => setCreateModalOpen(true)}
                >

                <FaPlus />
                <p>Add Card</p>

            </button>
        </div>
        </>
    )
}

export default TaskButton