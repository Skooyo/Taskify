"use client";

// functionality for moving between login and forget password
// import React, { useState } from 'react';
// import LoginForm from '@/components/LoginForm';
// import ForgetPasswordForm from '@/components/ForgetPasswordForm'; 

// const LoginPage: React.FC = () => {
//   const [showForgetPassword, setShowForgetPassword] = useState(false);

//   const handleShowForgetPassword = () => {
//     setShowForgetPassword(true);
//   };

//   const handleShowLogin = () => {
//     setShowForgetPassword(false);
//   };

//   return (
//     <div className="w-full p-4 px-8 min-h-fit bg-[#ffffff] flex flex-col gap-6 text-black rounded-2xl pb-10">
//       {showForgetPassword ? (
//         <ForgetPasswordForm />
//       ) : (
//         <LoginForm onForgetPassword={handleShowForgetPassword} />
//       )}
//     </div>
//   );
// };

// export default LoginPage;

// testing for new password
import React from 'react'; // Import React
import NewPasswordForm from '@/components/NewPasswordForm'; 

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <NewPasswordForm />  {/* Render the LoginForm component */}
    </div>
  );
};

export default LoginPage;
