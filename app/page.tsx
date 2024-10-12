"use client";

import TaskCard from "@/components/TaskCard";
import TaskList from "@/components/TaskList";
import ProductBacklogButtons from "@/components/ProductBacklogButtons";

import { getAllProductBacklogItems } from "@/lib/actions/product_backlog_item.actions";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { useSearchParams } from "next/navigation";
import NavBar from "@/components/NavBar";

import React from "react"; // Import React
import NewPasswordForm from "@/components/NewPasswordForm";
import { useRouter } from "next/router"; // Import the useRouter hook from next/router
import LoginForm from "@/components/LoginForm";
import ForgetPasswordForm from "@/components/ForgetPasswordForm";
import { useState } from "react";

export default function Home() {
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
    <main>
      {/* Page Header */}
      <div className="h-screen w-full flex-col space-y-4 mr-4">
        <div className="h-full w-full flex items-center justify-center p-8">
          {showLoginForm && (
            <LoginForm onForgetPassword={handleShowForgetPassword} />
          )}
          {showForgetPassword && (
            <ForgetPasswordForm
              onLoginClick={handleForgetPasswordButton}
              onCorrectAnswer={handleOpenNewPassword}
            />
          )}
          {showNewPassword && (
            <NewPasswordForm onPassChange={handlePassChange} />
          )}
        </div>
      </div>
    </main>
  );
}
