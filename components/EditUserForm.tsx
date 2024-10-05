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
import "react-datepicker/dist/react-datepicker.css";
import { createUser, updateUser } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { useEffect } from "react";

// Define the schema for the form
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
};

const EditUserForm = ({isOpen, setIsOpen, user}: ModalProps) => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleCloseModal = () => {
    setIsOpen(false); // Close the modal
    form.reset(); // Reset the form when closing
  };

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
      form.setValue("password", user.password);
    }
  }, [user])

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      console.log("Submitted values:", values);
      const item = await updateUser({
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
          isAdmin: user.isAdmin,
          _id: user._id
        }
      })
      handleCloseModal(); // Close the modal after submission
    } catch (error) {
      alert("The email or name has been used by another user"); // Display an alert with the error message
    }
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
      height: "450px",
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
          <p className="font-semibold text-2xl mt-4">Edit User Details</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-[#ffffff] h-full flex flex-col gap-5"
          >
           
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-black rounded-lg"
                      placeholder="Enter Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-black rounded-lg"
                      placeholder="Enter Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-black rounded-lg"
                      placeholder="Enter Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-12 text-black font-semibold px-16 w-full text-lg bg-[#FFD400] rounded-lg drop-shadow-xl hover:bg-[#c2a136]"
            >
              Update User Details
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default EditUserForm;
