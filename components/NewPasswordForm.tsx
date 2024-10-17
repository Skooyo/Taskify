"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changeAdminPassword } from "@/lib/actions/user.actions";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmation password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This will set the error on the confirmPassword field
  });

type FormValues = z.infer<typeof formSchema>;

type NewPasswordFormParams = {
  onPassChange: () => void;
};

const NewPasswordForm: React.FC<NewPasswordFormParams> = ({ onPassChange }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("New Password Data Submitted:", data);
    await changeAdminPassword({ newPassword: data.newPassword });
    onPassChange();
  };

  return (
    <div className="w-1/2 p-4 px-8 min-h-fit bg-[#ffffff] flex flex-col gap-6 text-black rounded-2xl pb-10">
      <div className="items-center justify-center flex">
        <p className="font-semibold text-2xl mt-4">Set Your New Password</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-[#ffffff] h-full flex flex-col gap-5"
        >
          {/* New Password Field */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border-black rounded-lg"
                    placeholder="Enter new password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border-black rounded-lg"
                    placeholder="Confirm new password"
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewPasswordForm;
