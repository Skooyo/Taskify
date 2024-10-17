import { TbAlertHexagon } from "react-icons/tb";
import { LuAlertTriangle } from "react-icons/lu";
import { TbTriangle } from "react-icons/tb";
import { TbTriangleInverted } from "react-icons/tb";

const TaskPriority = ({ priority }: { priority: string }) => {
  const bgColor = () => {
    if (priority == "Urgent") {
      return "bg-red-500";
    } else if (priority == "High") {
      return "bg-[#FF8C00]";
    } else if (priority == "Medium") {
      return "bg-[#FFC300]";
    } else if (priority == "Low") {
      return "bg-[#52b322]";
    }
  };

  return (
    <>
      <div
        className={`flex ${bgColor()} w-[95%] px-2 h-fit py-2 rounded-md drop-shadow-xl justify-center items-center text-white gap-2`}
      >
        {priority == " " || ""}
        {priority == "Urgent" && <TbAlertHexagon size={24} />}
        {priority == "High" && <LuAlertTriangle size={24} />}
        {priority == "Medium" && <TbTriangle size={24} />}
        {priority == "Low" && <TbTriangleInverted size={24} />}
        <p className="font-semibold text-lg">{priority}</p>
      </div>
    </>
  );
};

export default TaskPriority;
