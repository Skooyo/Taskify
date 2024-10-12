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
import Link from "next/link";
import { useRouter } from "next/router";
import { verifyUser } from "@/lib/actions/user.actions";
import { useState } from "react";

interface LoginFormProps {
  onForgetPassword: () => void;
}

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC<LoginFormProps> = ({ onForgetPassword }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data Submitted:", data);
    const user = await verifyUser({
      name: data.username,
      password: data.password,
    });
    sessionStorage.setItem("userLoggedIn", user);
    console.log(user);
  };

  return (
    <div className="w-full p-4 px-8 min-h-fit bg-[#ffffff] flex flex-col gap-6 text-black rounded-2xl pb-10">
      <div className="items-center justify-center flex">
        <p className="font-semibold text-2xl mt-4">Welcome Back!</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-[#ffffff] h-full flex flex-col gap-5"
        >
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-black rounded-lg"
                    placeholder="Enter username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border-black rounded-lg"
                    placeholder="Enter password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Login Button */}
          <Button
            type="submit"
            className="text-black font-semibold px-16 w-full text-lg bg-[#FFD400] rounded-lg drop-shadow-xl hover:bg-[#c2a136]"
          >
            Login
          </Button>

          {/* Forgot your password link */}
          <p>
            Forgot your password?{" "}
            <button
              onClick={onForgetPassword}
              className="bg-white text-blue-400 hover:opacity-70 border-none shadow-none hover:bg-white"
              type="button"
            >
              Reset Password
            </button>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
