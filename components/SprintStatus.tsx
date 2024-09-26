import { FaGear } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

const SprintStatus = ({ status }: { status: string }) => {
  const bgColor = () => {
    if (status == "Completed") {
      return "bg-[#7EFE40] text-black";
    } else if (status == "Active") {
      return "bg-[#FF8C00] text-black";
    } else if (status == "Not Started") {
      return "bg-[#BEBEBF] text-white";
    }
  };

  return (
    <>
      <div
        className={`flex ${bgColor()} px-2 h-2/3 items-center justify-center rounded-md drop-shadow-xl flex-shrink-0`}
      >
        {status == "Active" && <FaGear size={16} />}
        {status == "Completed" && <FaCheck size={16} />}
        {status == "Not Started" && <RxCross1 size={16} />}
        <p className="p-3 items-center justify-center text-lg font-semibold">
          {status}
        </p>
      </div>
    </>
  );
};

export default SprintStatus;
