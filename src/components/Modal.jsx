import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/2 lg:w-1/3">
        <button onClick={onClose} className="float-right">
          &times; 
        </button>
        <div>{children}</div> 
      </div>
    </div>
  );
};

export default Modal;
