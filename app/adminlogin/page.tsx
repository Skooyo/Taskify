"use client";

// testing for new password
import React from "react"; // Import React
import NewPasswordForm from "@/components/NewPasswordForm";
import { useRouter } from "next/router"; // Import the useRouter hook from next/router
import LoginForm from "@/components/LoginForm";
import ForgetPasswordForm from "@/components/ForgetPasswordForm";
import { useState } from "react";
import AdminLoginForm from "@/components/AdminLoginForm";

const LoginPage: React.FC = () => {
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleShowForgetPassword = () => {
    setShowForgetPassword(true);
    setShowLoginForm(false);
  };

  const handleForgetPasswordButton = () => {
    setShowForgetPassword(false);
    setShowLoginForm(true);
  };

  const handleOpenNewPassword = () => {
    setShowNewPassword(true);
    setShowForgetPassword(false);
  };

  const handlePassChange = () => {
    setShowNewPassword(false);
    setShowLoginForm(true);
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      {showLoginForm && (
        <AdminLoginForm onForgetPassword={handleShowForgetPassword} />
      )}
      {showForgetPassword && (
        <ForgetPasswordForm
          onLoginClick={handleForgetPasswordButton}
          onCorrectAnswer={handleOpenNewPassword}
        />
      )}
      {showNewPassword && <NewPasswordForm onPassChange={handlePassChange} />}
    </div>
  );
};

export default LoginPage;
