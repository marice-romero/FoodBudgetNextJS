import { FaRegRectangleXmark } from "react-icons/fa6";

const Modal = ({ setShowModal, children }) => {
  return (
    <div className="modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5" }}>
      <div className="w-full max-w-lg rounded-lg bg-gray-50 p-6">
        <div className="mb-4 flow-root">
          <button
            className="float-right p-1"
            onClick={() => setShowModal(false)}
          >
            <FaRegRectangleXmark className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
