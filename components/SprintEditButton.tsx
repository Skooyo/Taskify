import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const SprintEditButton: React.FC = () => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  return (
    <div>
      {/* Edit button */}
      <button
        type="button"
        className="items-center justify-center py-2 px-6 bg-[#2fd42a] text-background rounded-lg flex gap-2 text-white opacity-80"
        onClick={() => setIsUpdateFormOpen(true)}
      >
        <FaEdit size={24} />
        <p>Edit</p>
      </button>
    </div>
  );
};

export default SprintEditButton;
