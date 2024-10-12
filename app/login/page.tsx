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
import { useRouter } from 'next/router'; // Import the useRouter hook from next/router
import LoginForm from '@/components/LoginForm';
import ForgetPasswordForm from '@/components/ForgetPasswordForm';
import { useState } from 'react';

const LoginPage: React.FC = () => {
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleShowForgetPassword = () => {
    setShowForgetPassword(true);
    setShowLoginForm(false);
  }

  const handleForgetPasswordButton = () => {
    setShowForgetPassword(false);
    setShowLoginForm(true);
  }

  const handleOpenNewPassword = () => {
    setShowNewPassword(true);
    setShowForgetPassword(false);
  }

  const handlePassChange = () => {
    setShowNewPassword(false);
    setShowLoginForm(true);
  }

  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      {showLoginForm && <LoginForm onForgetPassword={handleShowForgetPassword} />}
      {showForgetPassword && <ForgetPasswordForm onLoginClick={handleForgetPasswordButton} onCorrectAnswer={handleOpenNewPassword}/>}
      {showNewPassword && <NewPasswordForm onPassChange={handlePassChange}/>}
    </div>
  );
};

export default LoginPage;
