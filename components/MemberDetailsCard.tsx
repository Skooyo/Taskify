import Bargraph from "./BarGraph";
const MemberDetailsCard = () => {
    return (
        <div className="flex justify-center items-center min-h-screen p-10"> 
            <div className="shadow-lg rounded-xl bg-white max-w-9xl min-h-[50vh] mx-auto"> 
                <div className="h-12 rounded-t-xl" style={{ backgroundColor: '#6B6F72'}}> 
                </div>

                <div className="grid grid-cols-7 grid-rows-5 gap-4 p-5 min-h-[90vh]">
                    <div className="col-span-2 row-span-2 flex justify-center items-center">
                        <div className="w-48 h-48 rounded-full flex justify-center items-center text-white text-7xl" style={{ backgroundColor: '#6B6F72' }}> {/* Circle with #6B6F72 */}
                            A
                        </div>
                    </div>

                    <div className="col-span-5 row-span-2 flex flex-col justify-center">
                        <p className="text-3xl font-bold">Member Name</p>
                        <p>Email: member@student.monash.edu</p>
                        <p>Total Hours Worked: 80 hours</p>
                    </div>

                    <div className="col-span-4 row-span-3 flex justify-center items-center"> 
                        <Bargraph />
                    </div>

                    <div className="col-span-3 row-span-3 flex flex-col justify-start max-h-[350px] overflow-y-auto"> {/* Add max height and overflow for scroll */}
                        <h1 className="text-xl font-bold mb-2">Work Description</h1>
                        <p className="text-sm">
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
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberDetailsCard;
