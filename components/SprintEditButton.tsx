import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { ISprint } from '@/lib/database/models/sprint.model';
import SprintUpdateForm from './SprintUpdateForm';

const SprintEditButton = ({sprint}: {sprint: ISprint}) => {
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
      <SprintUpdateForm isOpen={isUpdateFormOpen} setIsOpen={setIsUpdateFormOpen} sprint={sprint} />
    </div>
  );
};

export default SprintEditButton;
