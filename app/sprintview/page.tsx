"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "react-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define the schema for the form
const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
}).refine((data) => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

const CreateForm = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control the modal visibility

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const handleOpenModal = () => {
    setIsOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsOpen(false); // Close the modal
    form.reset(); // Reset the form when closing
  };

  const onSubmit = (values: any) => {
    console.log("Submitted values:", values);
    handleCloseModal(); // Close the modal after submission
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      maxWidth: "900px",
      width: "900px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "none",
      padding: "0px",
      borderRadius: "16px",
    },
  };

  return (
    <div>
      {/* Button to open the form modal */}
      <Button onClick={handleOpenModal} className="text-black bg-[#FFD400] px-4 py-2 rounded-lg">
        Open Sprint View Form
      </Button>

      {/* The modal containing the form */}
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="w-full p-4 px-8 min-h-fit bg-[#ffffff] flex flex-col gap-6 text-black rounded-2xl pb-10">
          <div className="items-center justify-center flex">
            <p className="font-semibold text-2xl mt-4">Create a new Task</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#ffffff] h-full flex flex-col gap-5"
            >
              {/* Task Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-black rounded-lg"
                        placeholder="Enter task title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Task Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date:</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date as Date)}
                        className="border-black rounded-lg w-full"
                        placeholderText="Select start date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Task End Date */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date:</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date as Date)}
                        className="border-black rounded-lg w-full"
                        placeholderText="Select end date"
                        minDate={form.watch("startDate")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="text-black font-semibold px-16 w-full text-lg bg-[#FFD400] rounded-lg drop-shadow-xl hover:bg-[#c2a136]"
              >
                Create New Task
              </Button>
            </form>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateForm;





// const mockData = [
//   {
//     _id: "1",
//     title: "Sprint 1",
//     status: "Active",
//     startDate: new Date(),
//     endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
//     createdAt: new Date(),
//     notStartedTasks: [] as IProductBacklogItem[],
//     inProgressTasks: [] as IProductBacklogItem[],
//     completedTasks: [] as IProductBacklogItem[],
//   },
//   {
//     _id: "2",
//     title: "Sprint 2",
//     status: "Active",
//     startDate: new Date(),
//     endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
//     createdAt: new Date(),
//     notStartedTasks: [] as IProductBacklogItem[],
//     inProgressTasks: [] as IProductBacklogItem[],
//     completedTasks: [] as IProductBacklogItem[],
//   },
//   {
//     _id: "3",
//     title: "Sprint 3",
//     status: "Active",
//     startDate: new Date(),
//     endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
//     createdAt: new Date(),
//     notStartedTasks: [] as IProductBacklogItem[],
//     inProgressTasks: [] as IProductBacklogItem[],
//     completedTasks: [] as IProductBacklogItem[],
//   },
//   {
//     _id: "4",
//     title: "Sprint 4",
//     status: "Active",
//     startDate: new Date(),
//     endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
//     createdAt: new Date(),
//     notStartedTasks: [] as IProductBacklogItem[],
//     inProgressTasks: [] as IProductBacklogItem[],
//     completedTasks: [] as IProductBacklogItem[],
//   },
//   {
//     _id: "5",
//     title: "Sprint 5",
//     status: "Active",
//     startDate: new Date(),
//     endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
//     createdAt: new Date(),
//     notStartedTasks: [] as IProductBacklogItem[],
//     inProgressTasks: [] as IProductBacklogItem[],
//     completedTasks: [] as IProductBacklogItem[],
//   },
//   {
//     _id: "6",
//     title: "Sprint 6",
//     status: "Active",
//     startDate: new Date(),
//     endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
//     createdAt: new Date(),
//     notStartedTasks: [] as IProductBacklogItem[],
//     inProgressTasks: [] as IProductBacklogItem[],
//     completedTasks: [] as IProductBacklogItem[],
//   },
// ] as ISprint[];

// const SprintView = () => {
//   return (
//     <div className="flex flex-col mt-[70px] mx-4 gap-6">
//       <div>
//         <h1 className="text-4xl font-semibold ml-10">Sprints</h1>
//       </div>
//       <div className="flex flex-col gap-10">
//         {mockData.map((sprint) => {
//           return (
//             <div key={sprint._id} className="bg-red min-w-full">
//               <SprintCard />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SprintView;
