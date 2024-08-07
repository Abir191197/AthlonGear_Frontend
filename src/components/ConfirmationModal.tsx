import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

Modal.setAppElement("#root"); // Ensure this matches your app's root element

// Define the props type
interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Confirm Deletion">
      <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
      <p className="mt-2 text-sm text-gray-600">
        Are you sure you want to delete this product?
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
          Yes
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
