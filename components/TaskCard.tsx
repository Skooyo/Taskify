"use client";

const TaskCard = () => {
    return (
        <>
            <div className="shadow-xl w-full h-fit bg-[#BA0000] rounded-2xl hover:cursor-pointer">
                <p className="opacity-0">color</p>
                <div className="bg-white h-full rounded-b-2xl flex-col items-center p-4 pb-8">
                    <p className="font-bold text-xl mb-2">Create API to get user data from database</p>
                    <div className="flex gap-6">
                        <div className="flex bg-green-400 w-[12%] h-full pt-1 items-center justify-center text-white rounded-lg">
                            <p>5</p>
                        </div>
                        <div className="flex bg-[#FF0000] w-fit px-2 h-full pt-1 items-center justify-center text-white rounded-lg">
                            <p>{"Urgent {!}"}</p>
                        </div>
                        <div className="flex bg-[#FF0000] w-fit px-2 h-full pt-1 items-center justify-center text-white rounded-lg">
                            <p>Not Started</p>
                        </div>
                    </div>
                    <div className="flex-col gap-4 mt-4">
                        <p className="font-semibold text-lg">Tags</p>
                        <div className="grid grid-cols-3 my-4 gap-1 gap-y-6 text-md">
                            <div className="flex bg-[#FFD400] opacity-80 w-fit px-2 h-full pt-1 items-center justify-center rounded-lg">
                                <p>Backend</p>
                            </div>
                            <div className="flex bg-[#FFD400] opacity-80 w-fit px-2 h-full pt-1 items-center justify-center rounded-lg">
                                <p>Database</p>
                            </div>
                            <div className="flex bg-[#FFD400] opacity-80 w-fit px-2 h-full pt-1 items-center justify-center rounded-lg">
                                <p>Framework</p>
                            </div>
                            <div className="flex bg-[#FFD400] opacity-80 w-fit px-2 h-full pt-1 items-center justify-center rounded-lg">
                                <p>Test</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskCard;