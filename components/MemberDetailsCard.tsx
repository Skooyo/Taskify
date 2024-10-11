"use client"

import { useEffect } from "react";
import Bargraph from "./BarGraph";
import { getAllUsers } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { Users } from "lucide-react";

type MemberDetailsCardProps = {
    user: IUser;
}


const MemberDetailsCard = ({user}: MemberDetailsCardProps) => {

    const totalHours = user.hoursLogged.reduce((a, b) => a + b, 0);

    return (
        <div className="flex justify-center items-center min-h-screen p-10 min-w-ful"> 
            <div className="shadow-lg rounded-xl bg-white min-h-[70vh] mx-auto min-w-full"> 
                <div className="h-12 rounded-t-xl" style={{ backgroundColor: '#6B6F72'}}> 
                </div>

                <div className="grid grid-cols-7 grid-rows-5 gap-4 p-5 min-h-[90vh]">
                    <div className="col-span-2 row-span-2 flex justify-center items-center">
                        <div className="w-48 h-48 rounded-full flex justify-center items-center text-white text-7xl" style={{ backgroundColor: '#6B6F72' }}> {/* Circle with #6B6F72 */}
                            A
                        </div>
                    </div>

                    <div className="col-span-5 row-span-2 flex flex-col justify-center">
                        <p className="text-3xl font-bold">Member Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Total Hours Worked: {totalHours}</p>
                        <p>Average Hours Worked: placeholder</p>
                        {/* TODO: finish this, need logic */}
                    </div>

                    <div className="col-span-4 row-span-3 flex justify-center items-center"> 
                        <Bargraph user={user}/>
                    </div>

                    <div className="col-span-3 row-span-3 flex flex-col justify-start max-h-[350px] overflow-y-auto"> {/* Add max height and overflow for scroll */}
                        <h1 className="text-xl font-bold mb-2">Work Description</h1>
                        {user.workDescriptions.map((workDescription, index) => {
                            return(
                                <div key={index}>
                                    <p>{new Date(user.dateOfWork[index]).toUTCString()}: {workDescription} ({user.hoursLogged[index]} hours)</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberDetailsCard;
