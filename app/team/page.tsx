import React from 'react'; // Make sure to import React
import MemberDetailsCard from "@/components/MemberDetailsCard";
import { getAllUsers } from '@/lib/actions/user.actions';
import { IUser } from '@/lib/database/models/user.model';

// Correct the function definition and export
const TeamView = async () => {

    const users = await getAllUsers()

    console.log(users)

    return (
        <div className="flex-col h-full overflow-y-auto w-full gap-8 flex">
            {users.map((user: IUser) => {
                return(
                    <MemberDetailsCard user={user} key={user._id}/>
                )
            })}
        </div>
    );
}

export default TeamView;
