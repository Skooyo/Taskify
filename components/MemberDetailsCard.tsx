import { LuUserCircle } from "react-icons/lu";

const MemberDetailsCard = () => {
    return(
        <div className="h-full">
            <div className="h-2/5 w-1/3 border-2 border-secondary shadow-lg rounded-lg bg-primary">
                <div className="h-2/5 w-full shadow-lg rounded-lg content-normal grid grid-cols-7 items-center align-middle">

                    <div className="h-full w-full col-span-2 items-center flex flex-cols justify-center align-center">
                        <LuUserCircle className="text-8xl text-white" />
                    </div>

                    <div className="h-2/3 w-full col-span-5 items-center flex flex-cols justify-start grid grid-rows-3 gap-5 font-semibold text-base text-white">
                        <p className="text-xl align-middle">
                            Pine Hein Swe
                        </p>
                        <p>
                            pine0002@student.monash.edu
                        </p>
                        <p>
                            120 hours worked
                        </p>
                    </div>

                </div>

                <div className="h-3/5 w-full grid grid-cols-2 flex-none">

                    <div className="h-full border-2 border-white text-white flex-none">
                        GRAPH
                    </div>

                    <div className="h-full grid grid-rows-6 text-base text-white flex-none">

                        <div>
                            <h1 className="text-xl row-span-1 text-center">
                                Work Description
                            </h1>
                        </div>

                        <div className="row-span-1">
                            <div className="grid grid-cols-4">
                                <p className="col-span-1">
                                    Date:
                                </p>
                                <p className="col-span-3 text-end px-1">
                                    7/10/2024
                                </p>
                            </div>
                        </div>

                        <div className="row-span-1 grid grid-cols-3">
                            <p className="col-span-2">
                                Hours Worked:
                            </p>
                            <p className="text-end px-1">
                                1HR
                            </p>
                        </div>

                        <div className="row-span-3">
                            <div className="grid grid-rows-3">
                                <p className="row-span-1">
                                    Description:
                                </p>
                                <p className="row-span-2 text-xs truncate hover:text-clip line-clamp-3 text-wrap px-1">
                                    This is a very detailed description yes indeed 
                                    yes very indeed detailed description of details
                                    that is very indeed
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}


export default MemberDetailsCard;