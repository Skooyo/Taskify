import React from "react";
import Modal from "react-modal";
import { Styles } from "react-modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { IUser } from "@/lib/database/models/user.model";
import { deleteUserById } from "@/lib/actions/user.actions";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser
};

const UserDeleteModal = ({
  isOpen,
  setIsOpen,
  user,
}: ModalProps) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "2/3",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#181818",
      border: "none",
      padding: "0px",
    },
  };

  const pathname = usePathname();

  const handleDelete = async () => {
    setIsOpen(false);
    await deleteUserById({
      _id: user._id
    })
  };

  return (
    <div className="gap-4 flex-col">
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles as Styles}
      >
        <div className="p-5 h-full flex flex-col items-center justify-center gap-3 bg-white">
          <h1 className="font-semibold p-2 text-center">
            Are you sure you want to delete this User?
          </h1>
          <div className="w-full flex gap-8 justify-between px-8 items-center">
            <button
              type="button"
              className="items-center justify-center py-2 px-8 bg-gray-200
                text-background rounded-lg flex gap-2 text-black opacity-80 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="items-center justify-center py-2 px-6 bg-red-500
                text-background rounded-lg flex gap-2 text-white opacity-80"
              onClick={handleDelete}
            >
              <FaRegTrashAlt size={16} />
              <p>Delete</p>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDeleteModal;
