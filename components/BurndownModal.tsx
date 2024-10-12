"use client";

import React from "react";
import Modal from "react-modal";
import BurndownChart from "./BurndownChart";

interface BurndownModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sprintStatus: string; 
}

const BurndownModal: React.FC<BurndownModalProps> = ({ 
  isOpen, 
  setIsOpen, 
  sprintStatus 
}) => {
  
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "70%", 
      height: "auto", 
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Example data
  const totalStoryPoints = 100; 
  const dates = ["2023-10-10", "2023-10-11", "2023-10-12"]; 
  const actualData = [100, 80, 50]; 

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={closeModal} 
      style={customStyles}>
        
      <h2>Burndown Chart</h2>
      <BurndownChart
        totalStoryPoints={totalStoryPoints}
        dates={dates}
        actualData={actualData}
        sprintStatus={sprintStatus} 
      />
      
      <button 
        onClick={closeModal} 
        className="mt-4 p-2 bg-red-500 text-white rounded-lg">
        Close
      </button>
    </Modal>
  );
};

export default BurndownModal;
