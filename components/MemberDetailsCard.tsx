const MemberDetailsCard = () => {
    return(
        <div className="h-lvh align-center pr-7">
            <div className="h-full shadow-lg rounded-lg bg-primary self-center">
                <div className="h-1/3 w-full shadow-lg rounded-lg content-normal grid grid-cols-7 items-center align-middle bg-accent">

                    <div className="h-full w-full col-span-2 content-normal flex justify-center items-center align-center text-white">
                        IMAGE
                    </div>

                    <div className="h-2/3 w-full col-span-5 flex flex-col items-start justify-center font-semibold text-base text-white">
                        <p className="text-3xl align-middle">
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

                <div className="h-2/3 w-full grid grid-cols-3 py-2 px-2 flex-none">

                    <div className="h-3/5 col-span-2 border-2 border-white text-white flex-col content-center items-center text-center aligh-center">
                        GRAPH
                    </div>

                    <div className="h-2/3 text-base text-white">

                        <div>
                            <h1 className="text-xl text-center py-2">
                                Work Description
                            </h1>
                        </div>

                        <div className="">
                            <div className="grid grid-cols-2">
                                <p className="text-start pl-1">
                                    Date:
                                </p>
                                <p className="text-end pr-1">
                                    7/10/2024
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <p className="text-start pl-1">
                                Hours Worked:
                            </p>
                            <p className="text-end px-1">
                                1HR
                            </p>
                        </div>

                        <div className="h-2/3">
                            <p className="pl-1">
                                Description:
                            </p>
                            <p className="text-xs text-wrap px-1 overflow-y-auto h-full">
                                This is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very indeed detailed description of details
                                that is very indeedThis is a very detailed description yes indeed 
                                yes very ind
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberDetailsCard;