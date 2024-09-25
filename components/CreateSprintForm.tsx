"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { FaRegCalendarAlt } from "react-icons/fa";
import { createSprint } from "@/lib/actions/sprints.actions";

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

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateSprintForm = ({isOpen, setIsOpen}: ModalProps) => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const handleCloseModal = () => {
    setIsOpen(false); // Close the modal
    form.reset(); // Reset the form when closing
  };

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log("Submitted values:", values);
    const item = await createSprint({
      sprint: {
        title: values.title,
        startDate: values.startDate,
        endDate: values.endDate,
        status: "Not Started",
        createdAt: new Date(),
        notStartedTasks: [],
        inProgressTasks: [],
        completedTasks: [],
      }
    })
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
      height: "550px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "none",
      padding: "0px",
      borderRadius: "16px",
      overflow: "visible",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="w-full p-4 px-8 min-h-fit bg-[#ffffff] flex flex-col gap-6 text-black rounded-2xl pb-10">
        <div className="items-center justify-center flex">
          <p className="font-semibold text-2xl mt-4">Create a new Sprint</p>
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
                  <FormLabel>Sprint Title:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-black rounded-lg"
                      placeholder="Enter sprint title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <div className="items-center flex h-[50px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <FaRegCalendarAlt size={24}/>
                    <p className="ml-3 whitespace-nowrap text-gray-600">Start Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date as Date)}
                      showTimeSelect
                      timeInputLabel="Time: "
                      dateFormat="dd/MM/yyyy hh:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <div className="items-center gap-8 flex h-[50px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <p className="ml-3 whitespace-nowrap text-gray-600">End Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date as Date)}
                      showTimeSelect
                      timeInputLabel="Time: "
                      dateFormat="dd/MM/yyyy hh:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="text-black font-semibold px-16 w-full text-lg bg-[#FFD400] rounded-lg drop-shadow-xl hover:bg-[#c2a136]"
            >
              Create New Sprint
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateSprintForm;
