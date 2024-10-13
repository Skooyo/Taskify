"use client";

import { useEffect } from "react";
import Bargraph from "./BarGraph";
import { getAllUsers, getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { useState } from "react";

type MemberDetailsCardProps = {
  // user: IUser;
  userId: string;
  startDate: Date;
  endDate: Date;
};

const MemberDetailsCard = ({
  userId,
  startDate,
  endDate,
}: MemberDetailsCardProps) => {
  const [user, setUser] = useState<IUser>({
    _id: "",
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    hoursLogged: [],
    workDescriptions: [],
    dateOfWork: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(userId);
      setUser(res);
    };

    fetchUser();
  }, []);

  const calculateDayDifference = (start: Date, end: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    return Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
  };

  let dayDifference = calculateDayDifference(startDate, endDate);

  if (dayDifference == 0) {
    dayDifference = 1;
  }

  const [hoursWorkedInDateRange, setHoursWorkedInDateRange] =
    useState<number>(0);

  const [showWorkDetail, setShowWorkDetail] = useState<boolean>(false);

  let totalHours = 0;
  useEffect(() => {
    if (user) {
      if (user.hoursLogged.length > 0) {
        const hoursInRange = user.hoursLogged.reduce((a, b, index) => {
          if (
            new Date(user.dateOfWork[index]) >= startDate &&
            new Date(user.dateOfWork[index]) <= endDate
          ) {
            console.log(user.dateOfWork[index]);
            return a + b;
          }
          return a;
        }, 0);
        setHoursWorkedInDateRange(hoursInRange);
      }
      totalHours = user.hoursLogged.reduce((a, b) => a + b, 0);
    }
  }, [startDate, endDate, user, hoursWorkedInDateRange]);

  // const totalHours = user.hoursLogged.reduce((a, b) => a + b, 0);

  return (
    <div className="flex justify-center items-center min-h-screen p-10 min-w-ful">
      <div className="shadow-lg rounded-xl bg-white min-h-[70vh] mx-auto min-w-full">
        <div
          className="h-12 rounded-t-xl"
          style={{ backgroundColor: "#6B6F72" }}
        ></div>

        <div className="grid grid-cols-7 grid-rows-5 gap-4 p-5 min-h-[90vh]">
          <div className="col-span-2 row-span-2 flex justify-center items-center">
            <div
              className="w-48 h-48 rounded-full flex justify-center items-center text-white text-7xl"
              style={{ backgroundColor: "#6B6F72" }}
            >
              {" "}
              {/* Circle with #6B6F72 */}A
            </div>
          </div>

          <div className="col-span-5 row-span-2 flex flex-col justify-center">
            <p className="text-3xl font-bold">Member Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Total Hours Worked: {totalHours}</p>
            <p>
              Average Hours Worked: {hoursWorkedInDateRange / dayDifference}{" "}
            </p>
          </div>

          {!showWorkDetail && <div className="w-full h-full col-span-8 items-center justify-center flex">
            <button
              className="text-black font-semibold px-16 py-2 w-1/4 text-lg bg-[#FFD400] rounded-lg drop-shadow-xl hover:bg-[#c2a136]"
              onClick={() => setShowWorkDetail(true)}
            >
              Show Work Details
            </button>
          </div>}

          {showWorkDetail && <>
          <div className="col-span-4 row-span-3 flex justify-center items-center">
            <Bargraph user={user} />
          </div>

          <div className="col-span-3 row-span-3 flex flex-col justify-start max-h-[350px] overflow-y-auto">
            {" "}
            {/* Add max height and overflow for scroll */}
            <h1 className="text-xl font-bold mb-2">Work Description</h1>
            {user?.workDescriptions.map((workDescription, index) => {
              return (
                <div key={index}>
                  <p>
                    {new Date(user.dateOfWork[index]).toUTCString()}:{" "}
                    {workDescription} ({user.hoursLogged[index]} hours)
                  </p>
                </div>
              );
            })}
          </div>
            </>}
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsCard;
