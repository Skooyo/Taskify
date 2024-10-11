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
  pbItem: IProductBacklogItem;
  focusTaskIsOpen: boolean;
  setFocusTaskIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isTaskUpdated: boolean;
  setIsTaskUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogHours = ({ isOpen, setIsOpen, pbItem, focusTaskIsOpen, setFocusTaskIsOpen, isTaskUpdated, setIsTaskUpdated }: ModalProps) => {
  const formSchema = z.object({
    description: z.string().optional(),
    hoursWorked: z.number().min(0),
    dateWorked: z.date({
      required_error: "Date worked is required"
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: " ",
      hoursWorked: 0,
      dateWorked: new Date(),
    },
  });

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

  const handleClose = () => {
    setIsOpen(false);
    setFocusTaskIsOpen(false);
    setIsTaskUpdated(!isTaskUpdated);
    form.reset(); // Reset the form values
    // window.location.reload(); // Reload the page
  };

  const pathname = usePathname();

  // TODO: Update the onSubmit function to log the work hours in database
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.description, values.hoursWorked, values.dateWorked);
    const item = await updateProductBacklogItemHours({
      productBacklogItem: pbItem,
      hoursWorked: values.hoursWorked,
      dateWorked: values.dateWorked.toISOString(),
      workDescription: values.description ?? "",
      pathname,
    });

    const user = await logUserHours({
      userName: pbItem.assignee.name,
      workDescription: values.description || "",
      hoursLogged: values.hoursWorked,
      dateWorked: values.dateWorked,
    })

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
            <p className="font-semibold text-2xl mt-4">Add work hours</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#ffffff] h-full flex flex-col gap-5"
            >
              <div className="flex flex-col gap-3">
                {/* Task Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work description:</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-black resize-none rounded-lg"
                          placeholder=""
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateWorked"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Date Worked:</FormLabel>
                      <FormControl className="h-72">
                        <div className="items-center flex h-[50px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                          <FaRegCalendarAlt size={24}/>
                          <p className="ml-3 whitespace-nowrap text-gray-600">Date Worked:</p>
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

                {/* Hours Worked */}
                <FormField
                    control={form.control}
                    name="hoursWorked"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours Worked</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number" // Add type="number" to make it a number input
                            className="rounded-lg w-[20%] border-neutral-400 py-2 remove-ring"
                            placeholder=""
                            onChange={(e) => {
                              field.onChange(parseInt(e.target.value)); // Parse the input value as an integer
                            }}
                          />
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
            Log Work Hours
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LogHours;
