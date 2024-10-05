import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-4">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <span className="text-xl">&times;</span>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
