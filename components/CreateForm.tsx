"use client";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import Modal from "react-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Styles } from "react-modal";
import { Tag } from "@/types";
import { getAllTags } from "@/lib/actions/tag.actions";
import TagCheckBox from "./TagCheckBox";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateForm = ({ isOpen, setIsOpen }: ModalProps) => {
  const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    priority: z.string(),
    storyPoints: z.number().max(10).min(0),
    status: z.string(),
    developmentPhase: z.string(),
    taskType: z.string(),
    assignee: z.string(),
    tags: z.array(z.string()).min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      storyPoints: 0,
      status: "",
      developmentPhase: "",
      taskType: "",
      assignee: "",
      tags: [],
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
    form.reset(); // Reset the form values
  };

  const taskPriority = ["Low", "Medium", "High", "Urgent"];

  const taskDevelopmentStage = [
    "Planning",
    "Development",
    "Testing",
    "Integration",
  ];

  const taskStatus = ["Not Started", "In Progress", "Completed"];

  const taskType = ["Story", "Bug"];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.tags = checkedTags.map((tag) => tag.name);
    setIsOpen(false);
    console.log(values);
    form.reset();
  }

  const [tags, setTags] = useState<Tag[]>([]);
  const [checkedTags, setCheckedTags] = useState<Tag[]>([]);

  useEffect(() => {
    console.log(checkedTags);
  }, [checkedTags]);

  useEffect(() => {
    // Fetch tags from the database
    const fetchTags = async () => {
      try {
        const res = await getAllTags();
        console.log(res);
        setTags(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTags();
  }, []);

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
            <p className="font-semibold text-2xl mt-4">Create a new Task</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#ffffff] h-full flex flex-row gap-5"
            >
              <div className="flex flex-col gap-3">
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

                {/* Task Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Description:</FormLabel>
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

                <div className="grid w-full grid-cols-3 gap-y-8">
                  {/* TODO figure out how this works because frankly speaking i have no idea how to implement this part */}
                  {/* Assigned Member */}
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assigned Member</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger
                              className={`w-[180px] border-gray-400 font-semibold remove-ring remove-ring`}
                            >
                              <SelectValue placeholder="Member" />
                            </SelectTrigger>
                            <SelectContent>
                              {taskPriority.map((priority) => (
                                <SelectItem value={priority}>
                                  {priority}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Development Stage */}
                  <FormField
                    control={form.control}
                    name="developmentPhase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Development Stage</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger
                              className={`w-[180px] border-gray-400 font-semibold remove-ring`}
                            >
                              <SelectValue placeholder="Development Stage" />
                            </SelectTrigger>
                            <SelectContent>
                              {taskDevelopmentStage.map((stage) => (
                                <SelectItem value={stage}>{stage}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Task Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task Status</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger
                              className={`w-[180px] border-gray-400 font-semibold remove-ring`}
                            >
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {taskStatus.map((status) => (
                                <SelectItem value={status}>{status}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Story Points */}
                  <FormField
                    control={form.control}
                    name="storyPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Story Points</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number" // Add type="number" to make it a number input
                            className="rounded-lg w-[75%] border-neutral-400 py-2 remove-ring"
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

                  {/* Priority */}
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task Priority</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger
                              className={`w-[180px] border-gray-400 font-semibold remove-ring`}
                            >
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              {taskPriority.map((priority) => (
                                <SelectItem value={priority}>
                                  {priority}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Task Type */}
                  <FormField
                    control={form.control}
                    name="taskType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger
                              className={`w-[180px] border-gray-400 font-semibold remove-ring`}
                            >
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {taskType.map((type) => (
                                <SelectItem value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Separating line */}
              <div className="w-[1px] bg-[#000] mx-2"></div>

              {/* Task Tags */}
              <div>
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Tags</FormLabel>
                      <FormControl>
                        <TagCheckBox
                          tags={tags}
                          checkedTags={checkedTags}
                          setCheckedTags={setCheckedTags}
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
            className="text-black font-semibold px-16 w-1/2 text-lg bg-[#FFD400] rounded-lg drop-shadow-xl hover:bg-[#c2a136]"
            onClick={form.handleSubmit(onSubmit)}
          >
            Create New Task
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateForm;
