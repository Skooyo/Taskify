import React from 'react';
import Modal from 'react-modal';
import { Styles } from 'react-modal';
import { MdHistoryEdu } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Task = {
    title: "very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long task",
    description: "very very very very very very very very very very very very very very very very very very very very very very very very this is a short task this is a short task this is a short taskthis is a short task this is a short task this is a short taskthis is a short task very very very very very very very very very very very very very very very very very very very very very very very very very very very very ",
    priority: "Urgent",
    storyPoints: 1,
    status: "In Progress",
    developmentPhase: "Development",
    totalLoggedHours: "0",
    loggedHours: ["Member 1"],
    taskType: "Story",
    createdAt: new Date(),
    assignee: {
        _id: "1",
        name: "Member 1",
    },
    tags: [{
        _id: "1",
        name: "Frontend",
    },
    {
        _id: "2",
        name: "Framework",
    },
    {
        _id: "3",
        name: "Database",
    },
    {
        _id: "4",
        name: "API",
    },
    {
        _id: "5",
        name: "UI",
    },
    {
        _id: "6",
        name: "Backend",
    },
    {
        _id: "7",
        name: "UI/UX",
    },
    {   
        _id: "8",
        name: "Testing",
    }]
};

const FocusedTaskView = ({ isOpen, setIsOpen }: ModalProps) => {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            maxWidth: "1000px",
            width: "1000px",
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "white",
            border: "none",
            padding: "0px",
            borderRadius: "16px",
        },
    };

    return (
        <div className="gap-4 flex-col">
            <Modal
                isOpen={isOpen}
                ariaHideApp={false}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles as Styles}
            >
                <div className="shadow-xl w-full h-fit bg-[#BA0000] rounded-xl">
                    <p className="opacity-0">color</p>

                    {/* Heading */}
                    <div className="bg-white h-full rounded-b-2xl flex-col items-center justify-center w-full py-4 px-16">
                        <div className="w-full justify-center items-center flex">
                            <p className="font-bold text-2xl mb-2 justify-center line-clamp-3">{Task.title}</p>
                        </div>
                        <div className="flex-col gap-4 mt-4">
                            <p className="font-semibold text-base">Tags:</p>

                            {/* Task Tags */}
                            <div>
                                <div className={`grid grid-cols-4 my-4 gap-y-6 text-md w-full justify-between items-center`}>
                                    {Task.tags.map(tag => (
                                        <div className={`flex bg-[#FFD400] opacity-80 w-[90%] px-2 py-1 h-fit items-center justify-center rounded-full text-sm`}>
                                            <p>{tag.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Collection of sub-components (below tags) */}
                            <div className="grid grid-cols-3 w-full h-full py-8 gap-10">

                                    {/* Assigned Member */}
                                    <div className="w-full">
                                        <p className="pl-1">Assigned Member:</p>
                                        <div className="flex bg-[#FFD400] opacity-80 w-[95%] px-2 h-fit pt-1 items-center justify-center rounded-md drop-shadow-xl">
                                            <p className="p-3 items-center justify-center w-full h-fit">{Task.assignee.name}</p>
                                        </div>
                                    </div>

                                    {/* TODO add conditional rendering based on the "development stage" the task is in (check figma for colors) */}
                                    {/* Development Stage */}
                                    <div className="w-full">
                                        <p className="pl-1">Development Stage</p>
                                        <div className="flex bg-[#639BE0] opacity-80 w-[95%] px-2 h-fit pt-1 items-center justify-center rounded-md drop-shadow-xl">
                                            <p className="p-3 items-center justify-center text-xl font-semibold text-white">{Task.developmentPhase}</p>
                                        </div>
                                    </div>

                                    {/* Task Status */}
                                    <div className="w-full">
                                        <p className="pl-1">Task Status:</p>
                                        <div className="flex bg-[#FF8C00] opacity-80 w-[95%] px-2 h-fit pt-1 items-center justify-center rounded-md drop-shadow-xl text-white">
                                            <FaGear size={24}/>
                                            <p className="p-3 items-center justify-center text-xl font-semibold">{Task.status}</p>
                                        </div>
                                    </div>

                                    {/* Story Points */}
                                    <div className="w-full">
                                        <p className="pl-1">Story Points:</p>
                                        <div className="flex bg-green-400 opacity-80 w-[95%] px-2 h-fit py-2 rounded-md drop-shadow-xl text-white gap-4">
                                        <div className="bg-white rounded-full w-fit px-2 h-fit">
                                            <p className="text-xl font-semibold text-green-400">P</p>
                                        </div>
                                        <p className="font-semibold text-lg items-center justify-center"> {Task.storyPoints} Point{Task.storyPoints > 1 ? "s" : ""}</p>
                                        </div>
                                    </div>

                                    {/* TODO conditional rendering per priority also, should i make a different component? */}
                                    {/* Priority */}
                                    <div className="w-full">
                                        <p className="pl-1">Priority:</p>
                                        <div className="flex bg-[#FF0000] opacity-80 w-[95%] px-2 h-fit py-2 rounded-md drop-shadow-xl justify-center items-center text-white gap-4">
                                        <p className="font-semibold text-lg">{Task.priority}</p>
                                        </div>
                                    </div>

                                    {/* TODO, once again conditional rendering, i think this one should be a different component */}
                                    {/* Task Type */}
                                    <div className="w-full">
                                        <p className="pl-1">Task Type:</p>
                                        <div className="flex bg-green-400 w-[95%] px-2 h-fit py-2 rounded-md drop-shadow-xl justify-center items-center text-black gap-1">
                                            <p className="items-center justify-center text-xl font-semibold">{Task.taskType}</p>
                                            <MdHistoryEdu size={32}/>
                                        </div>
                                    </div>

                            </div>

                            {/* Description */}
                            <div className="flex-col w-full mt-4 p-2 px-6 pr-8">
                                <div className="border border-black p-2 rounded-lg">
                                    <p className="font-semibold text-lg">Task Description</p>
                                    <div className="border border-black p-2 m-2 rounded-lg bg-[#D9D9D9]">
                                        <p className="text-md">{Task.description}</p>
                                    </div>
                                </div>


                        </div>
                    </div>
                </div>
            </div>
            </Modal>
        </div>
    );
};

export default FocusedTaskView;