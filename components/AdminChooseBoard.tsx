"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import Modal from "react-modal";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineTeam } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTeamDateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminChooseBoard = ({
  isOpen,
  setIsOpen,
  setIsTeamDateOpen,
}: ModalProps) => {
  const formSchema = z.object({
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "5%",
      left: "5%",
      right: "5%",
      bottom: "5%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "auto",
      marginBottom: "auto",
      backgroundColor: "white",
      border: "none",
      padding: "0px",
      borderRadius: "16px",
    },
  };

  const handleClose = () => {
    setIsOpen(false);
    form.reset(); // Reset the form values
    // window.location.reload(); // Reload the page
  };

  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 min-h-fit">
      <Modal
        isOpen={isOpen}
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={handleClose}
      >
        <div className="w-full h-full p-4 px-8 min-h-fit bg-[#ffffff] flex flex-col gap-6 text-black rounded-2xl pb-10">
          <div className="flex flex-col justify-center gap-5 items-center w-full h-full text-3xl font-semibold">
            Choose a Board
            <div className="flex justify-center items-center">
              <div
                onClick={() => {
                  setIsTeamDateOpen(true);
                  setIsOpen(false);
                }}
                className="font-semibold h-full text-2xl text-primary flex-1 flex-grow p-6 cursor-pointer"
              >
                <div className="w-56.25 h-full border-2 border-#ccc-300 shadow-lg rounded-lg flex flex-grow flex-col text-center items-center justify-center p-5">
                  <AiOutlineTeam className="text-5xl" />
                  <h2>Team Board</h2>
                </div>
              </div>
              <Link
                href={"/admin"}
                className="font-semibold text-2xl text-primary flex-1 flex-grow p-6"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-56.25 h-full border-2 border-#ccc-300 shadow-lg rounded-lg flex flex-grow flex-col text-center items-center justify-center p-5">
                  <RiAdminLine className="text-5xl" />
                  <h2>Admin Board</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminChooseBoard;
