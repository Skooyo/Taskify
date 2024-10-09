import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm: React.FC = () => {
  const form = useForm();

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
    </form>
  );
};

export default LoginForm;
