"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import React from "react";
import Modal from "react-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tag,
  taskDevelopmentStage,
  taskPriority,
  taskStatus,
  taskType,
  User,
} from "@/types";
import { usePathname } from "next/navigation";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { updateProductBacklogItemHours } from "@/lib/actions/product_backlog_item.actions";
import { set } from "mongoose";
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { logUserHours } from "@/lib/actions/user.actions";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
};

const TeamBoardDateSelect = ({
  isOpen,
  setIsOpen,
  setStartDate,
  setEndDate,
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

  // TODO: Update the onSubmit function to log the work hours in database
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStartDate(values.startDate);
    setEndDate(values.endDate);

    handleClose();
  }

  return (
    <div className="flex flex-col gap-8 min-h-fit">
      <Modal
        isOpen={isOpen}
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={handleClose}
      >
        <div className="w-full p-4 px-8 min-h-fit bg-[#ffffff] flex flex-col gap-6 text-black rounded-2xl pb-10">
          <div className="items-center justify-center flex">
            <p className="font-semibold text-2xl mt-4">Select Date Range</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#ffffff] h-full flex flex-col gap-5"
            >
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="h-72">
                        <div className="items-center flex h-[50px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                          <FaRegCalendarAlt size={24} />
                          <p className="ml-3 whitespace-nowrap text-gray-600">
                            Start Date:
                          </p>
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
                        <div className="items-center flex h-[50px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                        <FaRegCalendarAlt size={24} />
                          <p className="ml-3 whitespace-nowrap text-gray-600">
                            End Date:
                          </p>
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
            </form>
          </Form>
        </div>
        <div className="items-center justify-center w-full flex my-12">
          <Button
            type="submit"
            className="text-black font-semibold px-16 w-1/4 text-lg bg-[#FFD400] rounded-lg drop-shadow-xl hover:bg-[#c2a136]"
            onClick={form.handleSubmit(onSubmit)}
          >
            Select Date
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TeamBoardDateSelect;
