import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const form = useForm();

  const onSubmit = (data: any) => {
    // Log the data for now as placeholder, can pass to db later, for now just make the form first
    console.log("Form Data Submitted:", data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                placeholder="Enter your username"
                onChange={(e) => {
                  field.onChange(e);
                }}
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
                className="border-black rounded-lg"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Login Button */}
      <Button
        type="submit"
        className="text-black font-semibold px-16 w-1/2 text-lg bg-[#FFD400] rounded-lg drop-shadow-xl hover:bg-[#c2a136]"
      >
        Login
      </Button>

      {/* Forgot Password Link */}
      <div className="mt-4">
        <Link to="/reset-password" className="text-blue-500 hover:underline">
          Forgot your password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
