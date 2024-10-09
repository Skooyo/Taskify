import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm: React.FC = () => {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form>
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
        onClick={form.handleSubmit(onSubmit)}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
