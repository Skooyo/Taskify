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

const formSchema = z.object({
  securityQuestion1: z.string().min(1, { message: "Answer is required" }),
  securityQuestion2: z.string().min(1, { message: "Answer is required" }),
  securityQuestion3: z.string().min(1, { message: "Answer is required" }),
});

interface ForgetPasswordFormProps {
  onLoginClick: () => void;
  onCorrectAnswer: () => void;
}

type FormValues = z.infer<typeof formSchema>;

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({
  onLoginClick,
  onCorrectAnswer,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      securityQuestion1: "",
      securityQuestion2: "",
      securityQuestion3: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data Submitted:", data);
    let correctAnswers = 0;
    if (data.securityQuestion1 === "Amy") {
      correctAnswers++;
    }
    if (data.securityQuestion2 === "Buddy") {
      correctAnswers++;
    }
    if (data.securityQuestion3 === "Subang Jaya") {
      correctAnswers++;
    }

    if (correctAnswers === 3) {
      onCorrectAnswer();
    }
  };

  return (
    <div className="w-1/2 p-4 px-8 min-h-fit bg-[#ffffff] flex flex-col gap-6 text-black rounded-2xl pb-10">
      <div className="items-center justify-center flex">
        <p className="font-semibold text-2xl mt-4">Reset Your Admin Password</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-[#ffffff] h-full flex flex-col gap-5"
        >
          {/* Security Question 1 Field */}
          <FormField
            control={form.control}
            name="securityQuestion1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your mother's maiden name?</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-black rounded-lg"
                    placeholder="Answer to question 1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Security Question 2 Field */}
          <FormField
            control={form.control}
            name="securityQuestion2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What was the name of your first pet?</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-black rounded-lg"
                    placeholder="Answer to question 2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Security Question 3 Field */}
          <FormField
            control={form.control}
            name="securityQuestion3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What city were you born in?</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-black rounded-lg"
                    placeholder="Answer to question 3"
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
          {/* Link back to login */}
          <p>
            Remembered your password?{" "}
            <button
              onClick={onLoginClick}
              className="bg-white text-blue-400 hover:opacity-70 border-none shadow-none hover:bg-white"
              type="button"
            >
              Back to login
            </button>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;
