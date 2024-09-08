"use effect"

import { createProductBacklogItem } from '@/lib/actions/product_backlog_item.actions';
import Link from 'next/link'
import { FaPlus } from "react-icons/fa";

const TaskButton = () => {

    const handleClick = async () => {

        const newItem = await createProductBacklogItem({
          productBacklogItem: {
            title: "New Task",
            description: "New Task Description",
            priority: "Urgent",
            storyPoints: 1,
            status: "In Progress",
            developmentPhase: "Development",
            totalLoggedHours: "0",
            loggedHours: ["24/08/2024 18:00 - 19:00"],
            taskType: "Story",
            createdAt: new Date(),
          },
          tags: ["66d8f907523e0b15c2ecc787", "66d900fe8f4f270af7b71ccc", "66d9014d8f4f270af7b71ccf"],
          userId: "66d8f8e7523e0b15c2ecc785",
        })

        console.log(newItem)
        console.log("Add Card Button Clicked")
    }

    return(
        <>
            <div className="bg-[#FFD400] rounded-lg drop-shadow-xl">
                <button
                    type="button"
                    className="p-2 rounded-lg border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2"
                    onClick={handleClick}
                    >

                    <FaPlus />
                    <p>Add Card</p>

                </button>
            </div>
        </>
    )
}

export default TaskButton